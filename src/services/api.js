const API_BASE_URL = "http://localhost:8000";

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
  getCountries: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/countries`);
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
  }
};
