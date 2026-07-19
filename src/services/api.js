const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Helper to check if backend is running (optional check, we'll try-catch directly)
const getHeaders = (userProfile) => {
  if (!userProfile) return {};
  return {
    "X-User-Username": userProfile.username,
    "X-User-Role": userProfile.role,
    "Content-Type": "application/json"
  };
};

export const apiService = {
  // 1. Auth Login / Dynamic Register
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Authentication failed");
      }
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, falling back to local storage authentication.", error);
      
      // Fallback auth rules
      const normalizedUser = username.trim().toLowerCase();
      if (normalizedUser === 'admin' && password === 'admin') {
        return { username: 'admin', role: 'admin', label: 'Console Admin' };
      } else if (password === 'umoja' && normalizedUser.length >= 3) {
        return { username: normalizedUser, role: 'owner', label: username };
      }
      throw new Error(error.message || "Incorrect password or credentials.");
    }
  },

  // 2. Fetch Directory (Countries & Plots)
  getCountries: async (userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/countries`, {
        headers: getHeaders(userProfile)
      });
      if (!response.ok) throw new Error("Directory fetch failed");
      const data = await response.json();
      
      // Sync retrieved backend directory to localStorage
      localStorage.setItem('umoja_countries_data', JSON.stringify(data));
      return data;
    } catch (error) {
      console.warn("Backend offline, reading directory from local storage.", error);
      try {
        const local = localStorage.getItem('umoja_countries_data');
        if (local) {
          return JSON.parse(local);
        }
      } catch (parseError) {
        console.error("Local storage directory parse failed", parseError);
      }
      // If nothing in local storage or parse fails, return null and let the component fallback to DEFAULT_COUNTRIES
      return null;
    }
  },

  // 3. Add New Plot
  addPlot: async (plotData, userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/plots`, {
        method: "POST",
        headers: getHeaders(userProfile),
        body: JSON.stringify(plotData)
      });
      if (!response.ok) throw new Error("Plot creation failed");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, saving new plot listing locally.", error);
      
      const newPlotId = `plot-${Date.now()}`;
      const newPlot = {
        id: newPlotId,
        title: plotData.title,
        size: plotData.size,
        price: plotData.price,
        neighborhood: plotData.neighborhood,
        owner: userProfile.username,
        photos: plotData.photos
      };
      
      // Update local storage
      let local = [];
      try {
        const localRaw = localStorage.getItem('umoja_countries_data');
        if (localRaw) local = JSON.parse(localRaw);
      } catch (e) {
        console.error("Local catalog parse failed in addPlot", e);
      }
      if (!Array.isArray(local)) local = [];
      
      const updated = local.map(c => {
        if (c.id === plotData.country_id) {
          return {
            ...c,
            plots: [...(c.plots || []), newPlot]
          };
        }
        return c;
      });
      localStorage.setItem('umoja_countries_data', JSON.stringify(updated));
      return newPlot;
    }
  },

  // 4. Update Existing Plot
  updatePlot: async (plotId, plotData, userProfile, countryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/plots/${plotId}`, {
        method: "PUT",
        headers: getHeaders(userProfile),
        body: JSON.stringify(plotData)
      });
      if (!response.ok) throw new Error("Plot update failed");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, saving plot specifications locally.", error);
      
      let local = [];
      try {
        const localRaw = localStorage.getItem('umoja_countries_data');
        if (localRaw) local = JSON.parse(localRaw);
      } catch (e) {
        console.error("Local catalog parse failed in updatePlot", e);
      }
      if (!Array.isArray(local)) local = [];

      const updated = local.map(c => {
        if (c.id === countryId) {
          return {
            ...c,
            plots: (c.plots || []).map(p => {
              if (p.id === plotId) {
                return {
                  ...p,
                  title: plotData.title,
                  size: plotData.size,
                  price: plotData.price,
                  neighborhood: plotData.neighborhood,
                  photos: plotData.photos
                };
              }
              return p;
            })
          };
        }
        return c;
      });
      localStorage.setItem('umoja_countries_data', JSON.stringify(updated));
      return { id: plotId, ...plotData };
    }
  },

  // 4a. Delete Listing (Owner or Admin Only)
  deletePlot: async (plotId, userProfile, countryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/plots/${plotId}`, {
        method: "DELETE",
        headers: getHeaders(userProfile)
      });
      if (!response.ok) throw new Error("Plot deletion failed");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, deleting plot locally.", error);
      
      let local = [];
      try {
        const localRaw = localStorage.getItem('umoja_countries_data');
        if (localRaw) local = JSON.parse(localRaw);
      } catch (e) {
        console.error("Local catalog parse failed in deletePlot", e);
      }
      if (!Array.isArray(local)) local = [];

      const updated = local.map(c => {
        if (c.id === countryId) {
          return {
            ...c,
            plots: (c.plots || []).filter(p => p.id !== plotId)
          };
        }
        return c;
      });
      localStorage.setItem('umoja_countries_data', JSON.stringify(updated));
      return { status: "success", plotId };
    }
  },

  // 4b. Update Country Specifications (Admin Only)
  updateCountry: async (countryId, countryData, userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/countries/${countryId}`, {
        method: "PUT",
        headers: getHeaders(userProfile),
        body: JSON.stringify(countryData)
      });
      if (!response.ok) throw new Error("Country update failed");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, saving country specifications locally.", error);
      
      let local = [];
      try {
        const localRaw = localStorage.getItem('umoja_countries_data');
        if (localRaw) local = JSON.parse(localRaw);
      } catch (e) {
        console.error("Local catalog parse failed in updateCountry", e);
      }
      if (!Array.isArray(local)) local = [];

      const updated = local.map(c => {
        if (c.id === countryId) {
          return {
            ...c,
            motto: countryData.motto,
            desc: countryData.desc,
            videoUrl: countryData.videoUrl,
            accent: countryData.accent,
            highlights: countryData.highlights,
            potentialNeighborhoods: countryData.potentialNeighborhoods,
            cultureInfo: countryData.cultureInfo
          };
        }
        return c;
      });
      localStorage.setItem('umoja_countries_data', JSON.stringify(updated));
      return { id: countryId, ...countryData };
    }
  },

  // 5. Increment View Count
  trackView: async (plotId) => {
    try {
      await fetch(`${API_BASE_URL}/api/plots/${plotId}/view`, { method: "POST" });
    } catch (error) {
      // Local fallback tracking view
      try {
        const stats = JSON.parse(localStorage.getItem('umoja_plot_stats') || '{}');
        const plotStats = stats[plotId] || { views: 0, inquiries: [] };
        
        const viewedPlots = JSON.parse(sessionStorage.getItem('umoja_viewed_plots') || '[]');
        if (!viewedPlots.includes(plotId)) {
          plotStats.views = (plotStats.views || 0) + 1;
          stats[plotId] = plotStats;
          localStorage.setItem('umoja_plot_stats', JSON.stringify(stats));
          
          viewedPlots.push(plotId);
          sessionStorage.setItem('umoja_viewed_plots', JSON.stringify(viewedPlots));
        }
      } catch (e) {
        console.error("Local view tracking failed", e);
      }
    }
  },

  // 6. Submit Inquiry
  submitInquiry: async (inquiryData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData)
      });
      if (!response.ok) throw new Error("Inquiry submission failed");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, logging escrow inquiry locally.", error);
      
      const newInq = {
        id: 'inq-' + Math.floor(100000 + Math.random() * 900000),
        fullName: inquiryData.fullName,
        email: inquiryData.email,
        phone: inquiryData.phone || '',
        currentCity: inquiryData.currentCity || '',
        message: inquiryData.message || '',
        type: inquiryData.type,
        timestamp: new Date().toISOString()
      };
      
      // Save locally under plot stats
      try {
        const stats = JSON.parse(localStorage.getItem('umoja_plot_stats') || '{}');
        const plotStats = stats[inquiryData.plot_id] || { views: 0, inquiries: [] };
        plotStats.inquiries = [newInq, ...(plotStats.inquiries || [])];
        stats[inquiryData.plot_id] = plotStats;
        localStorage.setItem('umoja_plot_stats', JSON.stringify(stats));
      } catch (e) {
        console.error("Local inquiry logging failed", e);
      }
      
      return newInq;
    }
  },

  // 7. Get Tenant Dashboard Stats
  getDashboardStats: async (userProfile, localCountriesData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats/dashboard`, {
        headers: getHeaders(userProfile)
      });
      if (!response.ok) throw new Error("Dashboard stats failed");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline, calculating stats locally.", error);
      
      // Compute dashboard stats from local storage data
      let totalViews = 0;
      let totalInquiries = 0;
      const leads = [];
      
      const stats = JSON.parse(localStorage.getItem('umoja_plot_stats') || '{}');
      
      (Array.isArray(localCountriesData) ? localCountriesData : []).forEach(country => {
        if (country && Array.isArray(country.plots)) {
          country.plots.forEach(plot => {
            if (plot) {
              const ownerUsername = plot.owner_username || plot.owner;
              if (userProfile.role === 'admin' || ownerUsername === userProfile.username) {
                const plotStat = stats[plot.id] || { views: 0, inquiries: [] };
                totalViews += plotStat.views || 0;
                totalInquiries += plotStat.inquiries?.length || 0;
                
                if (Array.isArray(plotStat.inquiries)) {
                  plotStat.inquiries.forEach(inq => {
                    leads.push({
                      ...inq,
                      plotTitle: plot.title,
                      plotId: plot.id,
                      countryName: country.name
                    });
                  });
                }
              }
            }
          });
        }
      });
      
      leads.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      const conversionRate = totalViews > 0 ? ((totalInquiries / totalViews) * 100).toFixed(1) : '0.0';
      
      // Mock views chart for 7 days
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const viewsChart = days.map((day, idx) => ({
        day,
        count: idx === 5 ? Math.round(totalViews * 0.35) : Math.round(totalViews * 0.1),
        active: idx === 6
      }));
      
      return {
        totalViews,
        totalInquiries,
        conversionRate,
        leads,
        viewsChart
      };
    }
  },

  // 9. Register a new Owner Account (Pending Approval)
  register: async (username, password, label) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, label })
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Registration failed");
    }
    return await response.json();
  },

  // 10. Get Pending Owner Approvals (Admin Only)
  getPendingUsers: async (userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/pending-users`, {
        method: "GET",
        headers: getHeaders(userProfile)
      });
      if (!response.ok) throw new Error("Failed to fetch pending users");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline or error loading pending users", error);
      return [];
    }
  },

  // 11. Approve Owner User Registration (Admin Only)
  approveUser: async (username, userProfile) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/approve-user/${username}`, {
      method: "POST",
      headers: getHeaders(userProfile),
      body: JSON.stringify({})
    });
    if (!response.ok) throw new Error("Approval failed");
    return await response.json();
  },

  // 12. Get System Customization Notifications (Admin Only)
  getNotifications: async (userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/notifications`, {
        method: "GET",
        headers: getHeaders(userProfile)
      });
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline or error loading notifications", error);
      return [];
    }
  },

  // 13. Mark Notification as Read (Admin Only)
  readNotification: async (notifId, userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/notifications/${notifId}/read`, {
        method: "POST",
        headers: getHeaders(userProfile),
        body: JSON.stringify({})
      });
      if (!response.ok) throw new Error("Failed to read notification");
      return await response.json();
    } catch (error) {
      console.warn("Error marking notification read", error);
    }
  },

  // 14. Admin Adds a New Country (Name and Flag)
  addCountry: async (countryData, userProfile) => {
    const response = await fetch(`${API_BASE_URL}/api/countries`, {
      method: "POST",
      headers: getHeaders(userProfile),
      body: JSON.stringify({ name: countryData.name, flag: countryData.flag })
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Adding country failed");
    }
    const newCountry = await response.json();
    
    // Offline local storage sync
    try {
      let local = [];
      const localRaw = localStorage.getItem('umoja_countries_data');
      if (localRaw) local = JSON.parse(localRaw);
      local.push(newCountry);
      localStorage.setItem('umoja_countries_data', JSON.stringify(local));
    } catch (e) {
      console.error("Local catalog sync failed in addCountry", e);
    }
    return newCountry;
  },

  // 15. Get All Users (Admin Only)
  getUsers: async (userProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "GET",
        headers: getHeaders(userProfile)
      });
      if (!response.ok) throw new Error("Failed to fetch users list");
      return await response.json();
    } catch (error) {
      console.warn("Backend offline or error loading users", error);
      return [];
    }
  },

  // 16. Toggle Suspension (Admin Only)
  toggleSuspendUser: async (username, userProfile) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${username}/suspend`, {
      method: "POST",
      headers: getHeaders(userProfile),
      body: JSON.stringify({})
    });
    if (!response.ok) throw new Error("Failed to toggle user suspension");
    return await response.json();
  },

  // 17. Delete User Account (Admin Only)
  deleteUser: async (username, userProfile) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/users/${username}`, {
      method: "DELETE",
      headers: getHeaders(userProfile)
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return await response.json();
  },

  // 18. Toggle Country Visibility (Admin Only)
  toggleCountryVisibility: async (countryId, userProfile) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/countries/${countryId}/visibility`, {
      method: "POST",
      headers: getHeaders(userProfile),
      body: JSON.stringify({})
    });
    if (!response.ok) throw new Error("Failed to toggle country visibility");
    return await response.json();
  },

  // 19. Toggle Plot Visibility (Admin Only)
  togglePlotVisibility: async (plotId, userProfile) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/plots/${plotId}/visibility`, {
      method: "POST",
      headers: getHeaders(userProfile),
      body: JSON.stringify({})
    });
    if (!response.ok) throw new Error("Failed to toggle plot visibility");
    return await response.json();
  }
};
