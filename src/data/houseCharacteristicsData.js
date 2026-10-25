// Centralized English Data & Assets for House & Interior Characteristics
// Uses real architectural imagery from ../assets

// ── Construction & Structural Asset Imports ────────────────────────────────
import tts  from '../assets/tole.jfif';
import tts1 from '../assets/tole2.jfif';
import tts2 from '../assets/tole3.jfif';
import tts3 from '../assets/tole4.jfif';
import ovh  from '../assets/overhung3.jfif';
import ovh1 from '../assets/overhung2.jfif';
import ovh2 from '../assets/overhung.jfif';
import btp  from '../assets/terrasse.jfif';
import btp1 from '../assets/terrasse2.jfif';
import btp2 from '../assets/terrasse3.jfif';
import mrb  from '../assets/balcony.jfif';
import mrb1 from '../assets/balcony1.jfif';
import mrb2 from '../assets/balcony2.jfif';
import mrb3 from '../assets/balcony3.jfif';
import vc   from '../assets/archi.jfif';
import vc1  from '../assets/archi1.jfif';
import vc2  from '../assets/archi2.jfif';
import rpc  from '../assets/majestic.jfif';
import rpc1 from '../assets/majestic1.jfif';
import rpc2 from '../assets/majestic2.jfif';
import rpc3 from '../assets/majestic3.jfif';

import cc   from '../assets/carreaux.jfif';
import cc1  from '../assets/carreaux1.jfif';
import cc2  from '../assets/carreaux2.jfif';
import gpn  from '../assets/granite.jfif';
import gpn1 from '../assets/granite1.jfif';
import gpn2 from '../assets/granite2.jfif';
import gpn3 from '../assets/granite3.jfif';
import gpn4 from '../assets/granite4.jfif';
import bpf  from '../assets/wood floor.jfif';
import bpf1 from '../assets/wood floor1.jfif';
import bpf2 from '../assets/wood floor2.jfif';
import bpf3 from '../assets/wood floor3.jfif';
import migi from '../assets/import marble.jfif';
import migi1 from '../assets/import marble1.jfif';
import migi2 from '../assets/import marble2.jfif';
import migi3 from '../assets/import marble3.jfif';
import bcmc from '../assets/polished concrete.jfif';
import bcmc1 from '../assets/polished concrete1.jfif';
import bcmc2 from '../assets/polished concrete2.jfif';
import bcmc3 from '../assets/polished concrete3.jfif';
import mod  from '../assets/mosaic.jfif';
import mod1 from '../assets/mosaic1.jfif';
import mod2 from '../assets/mosaic2.jfif';
import mod3 from '../assets/mosaic3.jfif';

import elp  from '../assets/smoothpaintwall.jfif';
import elp1 from '../assets/smoothpaintwall1.jfif';
import elp2 from '../assets/smoothpaintwall2.jfif';
import elp3 from '../assets/smoothpaintwall3.jfif';
import ctt  from '../assets/crepi.jfif';
import ctt1 from '../assets/crepi1.jfif';
import ctt2 from '../assets/crepi2.jfif';
import ctt3 from '../assets/crepi3.jfif';
import ctt4 from '../assets/crepi4.jfif';
import bad  from '../assets/expobrick.jfif';
import bad1 from '../assets/expobrick1.jfif';
import bad2 from '../assets/expobrick2.jfif';
import bad3 from '../assets/expobrick3.jfif';
import lbm  from '../assets/expowall.jfif';
import lbm1 from '../assets/expowall1.jfif';
import lbm2 from '../assets/expowall2.jfif';
import lbm3 from '../assets/expowall3.jfif';
import lbm4 from '../assets/expowall4.jfif';
import smd1 from '../assets/expomarble1.jfif';
import smd2 from '../assets/expomarble2.jfif';
import smd3 from '../assets/expomarble3.jfif';
import smd4 from '../assets/expomarble4.jfif';

import dbp  from '../assets/betonpaint.jfif';
import dbp1 from '../assets/betonpaint1.jfif';
import dbp2 from '../assets/betonpaint2.jfif';
import fppc from '../assets/corniceceiling.jfif';
import fppc1 from '../assets/corniceceiling1.jfif';
import fppc2 from '../assets/corniceceiling2.jfif';
import fppc3 from '../assets/corniceceiling3.jfif';
import fppc4 from '../assets/corniceceiling4.jfif';
import fpld from '../assets/ledceiling.jfif';
import fpld1 from '../assets/ledceiling1.jfif';
import fpld2 from '../assets/ledceiling2.jfif';
import fpld3 from '../assets/ledceiling3.jfif';
import fpld4 from '../assets/ledceiling4.jfif';
import plb  from '../assets/woodceiling.jfif';
import plb1 from '../assets/woodceiling1.jfif';
import plb2 from '../assets/woodceiling2.jfif';
import plb3 from '../assets/woodceiling3.jfif';
import plb4 from '../assets/woodceiling4.jfif';
import dhc  from '../assets/cathedral.jfif';
import dhc1 from '../assets/cathedral1.jfif';
import dhc2 from '../assets/cathedral2.jfif';
import dhc3 from '../assets/cathedral3.jfif';
import dhc4 from '../assets/cathedral4.jfif';
import vac  from '../assets/arcceiling.jfif';
import vac1 from '../assets/arcceiling1.jfif';
import vac2 from '../assets/arcceiling2.jfif';
import vac3 from '../assets/arcceiling3.jfif';

import ebbp from '../assets/paintstair.jfif';
import ebbp1 from '../assets/paintstair1.jfif';
import ebbp2 from '../assets/paintstair2.jfif';
import edbm from '../assets/boismetal.jfif';
import edbm1 from '../assets/boismetal1.jfif';
import edbm2 from '../assets/boismetal2.jfif';
import edbm3 from '../assets/boismetal3.jfif';
import edbm4 from '../assets/boismetal4.jfif';
import edbm5 from '../assets/boismetal5.jfif';
import efds from '../assets/floatstair.jfif';
import efds1 from '../assets/floatstair1.jfif';
import efds2 from '../assets/floatstair2.jfif';
import efds3 from '../assets/floatstair3.jfif';
import efds4 from '../assets/floatstair4.jfif';
import ehm  from '../assets/helistair.jfif';
import ehm1 from '../assets/helistair1.jfif';
import ehm2 from '../assets/helistair2.jfif';
import ehm3 from '../assets/helistair3.jfif';
import ehm4 from '../assets/helistair4.jfif';
import gems from '../assets/grandmarblestair.jfif';
import gems1 from '../assets/grandmarblestair1.jfif';
import gems2 from '../assets/grandmarblestair2.jfif';
import gems3 from '../assets/grandmarblestair3.jfif';
import gems4 from '../assets/grandmarblestair4.jfif';
import gems5 from '../assets/grandmarblestair5.jfif';

import cbpm from '../assets/betonmetalext.jfif';
import cbpm1 from '../assets/betonmetalext1.jfif';
import cbpm2 from '../assets/betonmetalext2.jfif';
import cbpm3 from '../assets/betonmetalext3.jfif';
import cbpm4 from '../assets/betonmetalext4.jfif';
import cbpm5 from '../assets/betonmetalext5.jfif';
import tdap from '../assets/extterrasse.jfif';
import tdap1 from '../assets/extterrasse1.jfif';
import tdap2 from '../assets/extterrasse2.jfif';
import tdap3 from '../assets/extterrasse3.jfif';
import tdap4 from '../assets/extterrasse4.jfif';
import jpa  from '../assets/drivegardin.jfif';
import jpa1 from '../assets/drivegardin1.jfif';
import jpa2 from '../assets/drivegardin2.jfif';
import jpa3 from '../assets/drivegardin3.jfif';
import jpa4 from '../assets/drivegardin4.jfif';
import jpa5 from '../assets/drivegardin5.jfif';
import papm from '../assets/swimpool.jfif';
import papm1 from '../assets/swimpool1.jfif';
import papm2 from '../assets/swimpool2.jfif';
import papm3 from '../assets/swimpool3.jfif';
import papm4 from '../assets/swimpool4.jfif';
import papm5 from '../assets/swimpool5.jfif';

// ── Interior Asset Imports ────────────────────────────────────────────────
import cac  from '../assets/interior/cac.jfif';
import cac1 from '../assets/interior/cac1.jfif';
import cac2 from '../assets/interior/cac2.jfif';
import cac3 from '../assets/interior/cac3.jfif';
import jen  from '../assets/interior/jen.jfif';
import jen1 from '../assets/interior/jen1.jfif';
import jen2 from '../assets/interior/jen2.jfif';
import jen3 from '../assets/interior/jen3.jfif';
import jen4 from '../assets/interior/jen4.jfif';
import cdn  from '../assets/interior/cdn.jfif';
import cdn1 from '../assets/interior/cdn1.jfif';
import cdn2 from '../assets/interior/cdn2.jfif';
import cdn3 from '../assets/interior/cdn3.jfif';
import cdn4 from '../assets/interior/cdn4.jfif';
import par  from '../assets/interior/par.jfif';
import par1 from '../assets/interior/par1.jfif';
import par2 from '../assets/interior/par2.jfif';
import par3 from '../assets/interior/par3.jfif';
import par4 from '../assets/interior/par4.jfif';
import fon  from '../assets/interior/fon.jfif';
import fon1 from '../assets/interior/fon1.jfif';
import fon2 from '../assets/interior/fon2.jfif';
import fon3 from '../assets/interior/fon3.jfif';

import coss from '../assets/interior/coss.jfif';
import coss1 from '../assets/interior/coss1.jfif';
import coss2 from '../assets/interior/coss2.jfif';
import coss3 from '../assets/interior/coss3.jfif';
import coss4 from '../assets/interior/coss4.jfif';
import cff  from '../assets/interior/cff.jfif';
import cff1 from '../assets/interior/cff1.jfif';
import cff2 from '../assets/interior/cff2.jfif';
import cff3 from '../assets/interior/cff3.jfif';
import cbp  from '../assets/interior/cbp.jfif';
import cbp1 from '../assets/interior/cbp1.jfif';
import cbp2 from '../assets/interior/cbp2.jfif';
import cbp3 from '../assets/interior/cbp3.jfif';
import cbp4 from '../assets/interior/cbp4.jfif';
import cbe  from '../assets/interior/cbe.jfif';
import cbe1 from '../assets/interior/cbe1.jfif';
import cbe2 from '../assets/interior/cbe2.jfif';
import cbe3 from '../assets/interior/cbe3.jfif';
import cbe4 from '../assets/interior/cbe4.jfif';
import cnmp from '../assets/interior/cnmp.jfif';
import cnmp1 from '../assets/interior/cnmp1.jfif';
import cnmp2 from '../assets/interior/cnmp2.jfif';
import cnmp3 from '../assets/interior/cnmp3.jfif';

import das  from '../assets/interior/das.jfif';
import das1 from '../assets/interior/das1.jfif';
import das2 from '../assets/interior/das2.jfif';
import das3 from '../assets/interior/das3.jfif';
import nn   from '../assets/interior/nn.jfif';
import nn1  from '../assets/interior/nn1.jfif';
import nn2  from '../assets/interior/nn2.jfif';
import nn3  from '../assets/interior/nn3.jfif';
import nn4  from '../assets/interior/nn4.jfif';
import cdcn from '../assets/interior/cdcn.jfif';
import cdcn1 from '../assets/interior/cdcn1.jfif';
import cdcn2 from '../assets/interior/cdcn2.jfif';
import cdcn3 from '../assets/interior/cdcn3.jfif';
import she  from '../assets/interior/she.jfif';
import she1 from '../assets/interior/she1.jfif';
import she2 from '../assets/interior/she2.jfif';
import she3 from '../assets/interior/she3.jfif';
import she4 from '../assets/interior/she4.jfif';
import csae from '../assets/interior/csae.jfif';
import csae1 from '../assets/interior/csae1.jfif';
import csae2 from '../assets/interior/csae2.jfif';
import csae3 from '../assets/interior/csae3.jfif';

import spap from '../assets/interior/spap.jfif';
import spap1 from '../assets/interior/spap1.jfif';
import spap2 from '../assets/interior/spap2.jfif';
import spap3 from '../assets/interior/spap3.jfif';
import die  from '../assets/interior/die.jfif';
import die1 from '../assets/interior/die1.jfif';
import die2 from '../assets/interior/die2.jfif';
import die3 from '../assets/interior/die3.jfif';
import sbapn from '../assets/interior/sbapn.jfif';
import sbapn1 from '../assets/interior/sbapn1.jfif';
import sbapn2 from '../assets/interior/sbapn2.jfif';
import sbapn3 from '../assets/interior/sbapn3.jfif';
import smpn from '../assets/interior/smpn.jfif';
import smpn1 from '../assets/interior/smpn1.jfif';
import smpn2 from '../assets/interior/smpn2.jfif';
import smpn3 from '../assets/interior/smpn3.jfif';
import ssr  from '../assets/interior/ssr.jfif';
import ssr1 from '../assets/interior/ssr1.jfif';
import ssr2 from '../assets/interior/ssr2.jfif';
import ssr3 from '../assets/interior/ssr3.jfif';

import mdln from '../assets/interior/mdln.jfif';
import mdln1 from '../assets/interior/mdln1.jfif';
import mdln2 from '../assets/interior/mdln2.jfif';
import mdln3 from '../assets/interior/mdln3.jfif';
import sez  from '../assets/interior/sez.jfif';
import sez1 from '../assets/interior/sez1.jfif';
import sez2 from '../assets/interior/sez2.jfif';
import sez3 from '../assets/interior/sez3.jfif';
import libe from '../assets/interior/libe.jfif';
import libe1 from '../assets/interior/libe1.jfif';
import libe2 from '../assets/interior/libe2.jfif';
import libe3 from '../assets/interior/libe3.jfif';
import lasd from '../assets/interior/lasd.jfif';
import lasd1 from '../assets/interior/lasd1.jfif';
import lasd2 from '../assets/interior/lasd2.jfif';
import lasd3 from '../assets/interior/lasd3.jfif';
import ems  from '../assets/interior/ems.jfif';
import ems1 from '../assets/interior/ems1.jfif';
import ems2 from '../assets/interior/ems2.jfif';
import ems3 from '../assets/interior/ems3.jfif';

import pesm from '../assets/interior/pesm.jfif';
import pesm1 from '../assets/interior/pesm1.jfif';
import pesm2 from '../assets/interior/pesm2.jfif';
import pesm3 from '../assets/interior/pesm3.jfif';
import dcd  from '../assets/interior/dcd.jfif';
import dcd1 from '../assets/interior/dcd1.jfif';
import dcd2 from '../assets/interior/dcd2.jfif';
import dcd3 from '../assets/interior/dcd3.jfif';
import eod  from '../assets/interior/eod.jfif';
import eod1 from '../assets/interior/eod1.jfif';
import eod2 from '../assets/interior/eod2.jfif';
import eod3 from '../assets/interior/eod3.jfif';

// ── Decor & Color Asset Imports ───────────────────────────────────────────
import cae  from '../assets/color/cae.jfif';
import cae1 from '../assets/color/cae1.jfif';
import cae2 from '../assets/color/cae2.jfif';
import cae3 from '../assets/color/cae3.jfif';
import cae4 from '../assets/color/cae4.jfif';
import faa  from '../assets/color/faa.jfif';
import faa1 from '../assets/color/faa1.jfif';
import faa2 from '../assets/color/faa2.jfif';
import faa3 from '../assets/color/faa3.jfif';
import faa4 from '../assets/color/faa4.jfif';
import daf  from '../assets/color/daf.jfif';
import daf1 from '../assets/color/daf1.jfif';
import daf2 from '../assets/color/daf2.jfif';
import daf3 from '../assets/color/daf3.jfif';
import daf4 from '../assets/color/daf4.jfif';
import nao  from '../assets/color/nao.jfif';
import nao1 from '../assets/color/nao1.jfif';
import nao2 from '../assets/color/nao2.jfif';
import nao3 from '../assets/color/nao3.jfif';
import nao4 from '../assets/color/nao4.jfif';
import jac  from '../assets/color/jac.jfif';
import jac1 from '../assets/color/jac1.jfif';
import jac2 from '../assets/color/jac2.jfif';
import jac3 from '../assets/color/jac3.jfif';
import jac4 from '../assets/color/jac4.jfif';

import cut  from '../assets/color/cut.jfif';
import cut1 from '../assets/color/cut1.jfif';
import cut2 from '../assets/color/cut2.jfif';
import cut3 from '../assets/color/cut3.jfif';
import cut4 from '../assets/color/cut4.jfif';
import ban  from '../assets/color/ban.jfif';
import ban1 from '../assets/color/ban1.jfif';
import ban2 from '../assets/color/ban2.jfif';
import ban3 from '../assets/color/ban3.jfif';
import lbv  from '../assets/color/lbv.jfif';
import lbv1 from '../assets/color/lbv1.jfif';
import lbv2 from '../assets/color/lbv2.jfif';
import lbv3 from '../assets/color/lbv3.jfif';
import ppm1 from '../assets/color/ppm1.jfif';
import ppm2 from '../assets/color/ppm2.jfif';
import ppm3 from '../assets/color/ppm3.jfif';
import ppm4 from '../assets/color/ppm4.jfif';
import ppm5 from '../assets/color/ppm5.jfif';
import bcem from '../assets/color/bcem.jfif';
import bcem1 from '../assets/color/bcem1.jfif';
import bcem2 from '../assets/color/bcem2.jfif';
import bcem3 from '../assets/color/bcem3.jfif';

import lacn from '../assets/color/lacn.jfif';
import lacn1 from '../assets/color/lacn1.jfif';
import lacn2 from '../assets/color/lacn2.jfif';
import lacn3 from '../assets/color/lacn3.jfif';
import vav  from '../assets/color/vav.jfif';
import vav1 from '../assets/color/vav1.jfif';
import vav2 from '../assets/color/vav2.jfif';
import vav3 from '../assets/color/vav3.jfif';
import cas  from '../assets/color/cas.jfif';
import cas1 from '../assets/color/cas1.jfif';
import cas2 from '../assets/color/cas2.jfif';
import cas3 from '../assets/color/cas3.jfif';
import balt from '../assets/color/balt.jfif';
import balt1 from '../assets/color/balt1.jfif';
import balt2 from '../assets/color/balt2.jfif';
import balt3 from '../assets/color/balt3.jfif';
import mme  from '../assets/color/mme.jfif';
import mme1 from '../assets/color/mme1.jfif';
import mme2 from '../assets/color/mme2.jfif';
import mme3 from '../assets/color/mme3.jfif';
import mme4 from '../assets/color/mme4.jfif';

import glc  from '../assets/color/glc.jfif';
import glc1 from '../assets/color/glc1.jfif';
import glc2 from '../assets/color/glc2.jfif';
import glc3 from '../assets/color/glc3.jfif';
import sm1  from '../assets/color/sm1.jfif';
import sm2  from '../assets/color/sm2.jfif';
import sm3  from '../assets/color/sm3.jfif';
import amd  from '../assets/color/amd.jfif';
import amd1 from '../assets/color/amd1.jfif';
import amd2 from '../assets/color/amd2.jfif';
import amd3 from '../assets/color/amd3.jfif';
import ldsac from '../assets/color/ldsac.jfif';
import ldsac1 from '../assets/color/ldsac1.jfif';
import ldsac2 from '../assets/color/ldsac2.jfif';
import ldsac3 from '../assets/color/ldsac3.jfif';

import qpc  from '../assets/color/qpc.jfif';
import qpc1 from '../assets/color/qpc1.jfif';
import qpc2 from '../assets/color/qpc2.jfif';
import qpc3 from '../assets/color/qpc3.jfif';
import mvotm from '../assets/color/mvotm.jfif';
import mvotm1 from '../assets/color/mvotm1.jfif';
import mvotm2 from '../assets/color/mvotm2.jfif';
import mvotm3 from '../assets/color/mvotm3.jfif';
import sv   from '../assets/color/sv.jfif';
import sv1  from '../assets/color/sv1.jfif';
import sv2  from '../assets/color/sv2.jfif';
import sv3  from '../assets/color/sv3.jfif';

// ── COLOR PALETTES ────────────────────────────────────────────────────────
export const COLOR_PALETTES = {
  obsidian:   { name: "Volcanic Obsidian",   hex: "#1c1c1c", accent: "#c9a84c", wall: "#1c1c1c", label: "Dark & Luxurious",     finish: "Velvet Matte" },
  alabaster:  { name: "Alabaster Cream",     hex: "#f0ebe0", accent: "#b8956a", wall: "#f0ebe0", label: "Bright Minimalist",    finish: "Satin Finish" },
  terracotta: { name: "Organic Terracotta",  hex: "#c4714a", accent: "#8b5e3c", wall: "#c4714a", label: "Warm & Earthy",        finish: "Velvet Matte" },
  velvet:     { name: "Metropolitan Indigo", hex: "#2c3e6b", accent: "#7c9bc4", wall: "#2c3e6b", label: "Bold & Urban",         finish: "Satin Finish" },
  sage:       { name: "Zen Sage Green",      hex: "#7a9e7e", accent: "#4a6b4e", wall: "#7a9e7e", label: "Calm & Botanical",     finish: "Matte Finish" },
  champagne:  { name: "Prestige Champagne",  hex: "#e8d5b0", accent: "#b8913a", wall: "#e8d5b0", label: "Opulent & Golden",     finish: "Polished Gloss" },
  blanc:      { name: "Pure Linen White",    hex: "#F8F8F8", accent: "#1A3E26", wall: "#F8F8F8", label: "Classic & Universal",  finish: "Satin Finish" },
  gris:       { name: "Slate Contemporary",  hex: "#64748B", accent: "#CBD5E1", wall: "#64748B", label: "Subtle & Architectural",finish: "Matte Finish" },
};

// ── CONSTRUCTION & STRUCTURAL CHARACTERISTICS (BUILD FROM SCRATCH) ─────────
export const SECTIONS_CONSTRUCTION = {
  facade: {
    id: "facade", icon: "🏠", label: "Façade & Roof",
    title: "Façade Architecture & Roof Profile",
    subtitle: "Defines the exterior landmark presence and thermal weather protection of your home",
    options: [
      { id: "fac_gable1",  label: "Pitched Triangular Gable Roof",    desc: "Longspan aluminum Gerard stone-coated tiles on reinforced concrete beams — durable and cost-effective", img: [tts, tts1, tts2, tts3] },
      { id: "fac_gable2",  label: "Stucco 2-Slope Overhung Roof",      desc: "Textured mineral exterior finish with deep protective eaves — resilient against heavy tropical rains", img: [ovh, ovh1, ovh2] },
      { id: "fac_bungalow",label: "Contemporary Flat Roof Terrace",    desc: "Horizontal minimalist profile with usable concrete sky terrace, engineered for future vertical expansion", img: [btp, btp1, btp2] },
      { id: "fac_r1",      label: "2-Storey Duplex with Cantilever Balcony", desc: "Two elevated living levels, wraparound glass-railed balcony — prime executive urban benchmark", img: [mrb, mrb1, mrb2, mrb3] },
      { id: "fac_contemp", label: "Ultra-Modern Geometric Villa",      desc: "Interlocking geometric cubes, recessed tinted glass envelopes, and concealed parapet roof drainage", img: [vc, vc1, vc2] },
      { id: "fac_prestige",label: "Classical Colonnade Residence",     desc: "Double-height fluted entry columns, majestic porte-cochère, and monumental exterior presence", img: [rpc, rpc1, rpc2, rpc3] },
    ]
  },
  sols: {
    id: "sols", icon: "⬛", label: "Flooring",
    title: "Flooring & Architectural Surfaces",
    subtitle: "Premium floor finishes engineered for tropical durability, bare-foot comfort, and easy maintenance",
    options: [
      { id: "sol_carrelage", label: "60×60 Rectified Porcelain Tile", desc: "Stain-resistant, scratch-proof, locally available — practical, cool underfoot, and easy to clean", img: [cc, cc1, cc2] },
      { id: "sol_granit",    label: "Natural Polished Granite Slabs", desc: "Heavy-duty quarried stone with crystalline depth, zero porosity, and lifelong structural durability", img: [gpn, gpn1, gpn2, gpn3, gpn4] },
      { id: "sol_parquet",   label: "Engineered Oak Parquet Flooring", desc: "Moisture-sealed natural hardwood parquet — brings rich acoustic warmth and prestige to bedrooms", img: [bpf, bpf1, bpf2, bpf3] },
      { id: "sol_marbre",    label: "Imported Large-Format Marble (80×160)", desc: "Italian Carrara and Spanish Calacatta with bookmatched natural veining for luxury reception halls", img: [migi, migi1, migi2, migi3] },
      { id: "sol_beton",     label: "Polished Micro-Cement Screed",   desc: "Seamless industrial loft aesthetic, zero grout lines, monolithic modern look with satin epoxy seal", img: [bcmc, bcmc1, bcmc2, bcmc3] },
      { id: "sol_mosaique",  label: "Bespoke Geometric Mosaic Inlay", desc: "Artisanal hand-laid patterns for entrance lobbies, powder rooms, or spa wet areas", img: [mod, mod1, mod2, mod3] },
    ]
  },
  structure: {
    id: "structure", icon: "🧱", label: "Wall Finishes",
    title: "Interior Wall Finishes & Textures",
    subtitle: "From smooth screeded architectural paint to tactile masonry and acoustic wood",
    options: [
      { id: "mur_enduit",    label: "Smooth Screeded Washable Paint", desc: "Multi-coat acrylic emulsion over sanded screed — clean, neutral backdrop ready for fine art", img: [elp, elp1, elp2, elp3] },
      { id: "mur_crepi",     label: "Textured Troweled Mineral Stucco",desc: "Tactile relief that catches natural directional daylight, hiding minor settling cracks without extra cost", img: [ctt, ctt1, ctt2, ctt3, ctt4] },
      { id: "mur_brique",    label: "Exposed Architectural Clay Brick",desc: "Warm kiln-fired terracotta brick accent wall — rich industrial texture and high thermal inertia", img: [bad, bad1, bad2, bad3] },
      { id: "mur_bois",      label: "Acoustic Vertical Timber Slats",  desc: "Natural oak or fluted walnut slats on acoustic black felt — premium warmth and echo dampening", img: [lbm, lbm1, lbm2, lbm3, lbm4] },
      { id: "mur_stuc",      label: "Venetian Polished Stucco Plaster", desc: "Hand-troweled burnished lime plaster with marble dust — creates a glossy, reflective mirror wall", img: [smd1, smd2, smd3, smd4] },
    ]
  },
  plafond: {
    id: "plafond", icon: "✨", label: "Ceiling",
    title: "Ceiling Design & Spatial Height",
    subtitle: "Ceiling treatment and lighting coves define room acoustics, airflow, and scale",
    options: [
      { id: "pla_simple",  label: "Flush Screeded Concrete Ceiling",  desc: "Cost-efficient 2.8m standard ceiling height — clean minimalism with surface or downlight points", img: [dbp, dbp1, dbp2] },
      { id: "pla_placo",   label: "Classic Molded POP Plaster & Cornice", desc: "Recessed gypsum plasterboards with refined perimeter crown molding and central medallion", img: [fppc, fppc1, fppc2, fppc3, fppc4] },
      { id: "pla_led",     label: "Architectural Drop Tray with LED Coves", desc: "Recessed shadow-gap perimeter coves with 3000K warm indirect LED glow and magnetic track spots", img: [fpld, fpld1, fpld2, fpld3, fpld4] },
      { id: "pla_lambris", label: "Suspended Natural Timber Ceiling", desc: "Warm linear cedar or teak ceiling baffles — softens double-volume rooms with organic luxury", img: [plb, plb1, plb2, plb3, plb4] },
      { id: "pla_double",  label: "Double-Height Cathedral Void",     desc: "Dramatic 6-meter ceiling void over the main living lounge with soaring panoramic glass curtain walls", img: [dhc, dhc1, dhc2, dhc3, dhc4] },
      { id: "pla_voute",   label: "Coffered Ceiling with Structural Arches", desc: "Bespoke recessed structural coffer grid — historical grandeur and prestige craftsmanship", img: [vac, vac1, vac2, vac3] },
    ]
  },
  escalier: {
    id: "escalier", icon: "🪜", label: "Staircase",
    title: "Internal Staircase Architecture",
    subtitle: "The primary structural sculpture inside multi-level residences",
    options: [
      { id: "esc_beton",      label: "Reinforced Concrete with Wrought Iron", desc: "Solid monolithic cast-in-place concrete with bespoke powder-coated steel balustrades", img: [ebbp, ebbp1, ebbp2] },
      { id: "esc_bois",       label: "Solid Hardwood Treads with Steel Stringer", desc: "Exposed black steel central spine with thick iroko/teak wooden treads and clean lines", img: [edbm, edbm1, edbm2, edbm3, edbm4, edbm5] },
      { id: "esc_flottant",   label: "Floating Cantilever with Frameless Glass", desc: "Cantilevered wall-anchored floating treads and 12mm laminated tempered glass railings", img: [efds, efds1, efds2, efds3, efds4] },
      { id: "esc_spiral",     label: "Curved Helical Spiral Staircase",       desc: "Sculptural continuous spiral ribbon — saves floor footprint while creating an artistic centerpiece", img: [ehm, ehm1, ehm2, ehm3, ehm4] },
      { id: "esc_monumental", label: "Imperial Grand Marble Staircase",       desc: "Double-flight sweeping staircase clad in solid white marble with brass inlay and accent step lighting", img: [gems, gems1, gems2, gems3, gems4, gems5] },
    ]
  },
  exterieur: {
    id: "exterieur", icon: "🌿", label: "Outdoor Grounds",
    title: "Outdoor Grounds, Landscape & Amenities",
    subtitle: "Security perimeter, private terrace, driveway paving, and recreational lifestyle",
    options: [
      { id: "ext_simple",   label: "Perimeter Block Wall & Motorized Gate", desc: "Solid 9-foot boundary wall, anti-climb spikes, and heavy-gauge automated sliding steel gate", img: [cbpm, cbpm1, cbpm2, cbpm3, cbpm4, cbpm5] },
      { id: "ext_terrasse", label: "Paved Dining Terrace with Timber Pergola", desc: "Seamless indoor-outdoor entertaining deck with cedar pergola shade for alfresco dining", img: [tdap, tdap1, tdap2, tdap3, tdap4] },
      { id: "ext_jardin",   label: "Interlocking Cobblestone Driveway & Lawn", desc: "Permeable grass-paver driveway with manicured carpet grass, palm trees, and landscape up-lights", img: [jpa, jpa1, jpa2, jpa3, jpa4, jpa5] },
      { id: "ext_piscine",  label: "Infinity Swimming Pool & Sunken Firepit", desc: "In-ground reinforced concrete pool with mosaic tile finish, submerged LED lights, and lounge deck", img: [papm, papm1, papm2, papm3, papm4, papm5] },
    ]
  },
};

// ── INTERIOR DESIGN & ROOM FINISHING CHARACTERISTICS ─────────────────────────
export const SECTIONS_INTERIOR = {
  ambiance_salon: {
    id: "ambiance_salon", icon: "🛋️", label: "Living Room",
    title: "Primary Living Lounge Ambience",
    subtitle: "The heart of your home — select the atmosphere for family living and executive entertainment",
    options: [
      { id: "as_cosy",     label: "Warm & Cozy Organic",         desc: "Plush oversized seating, warm linen textures, and soft warm lighting — welcoming and grounded", img: [cac, cac1, cac2, cac3] },
      { id: "as_japandi",  label: "Minimalist Japandi Zen",      desc: "Low-profile timber furniture, breathable negative space, and Japanese-Scandinavian serenity", img: [jen, jen1, jen2, jen3, jen4] },
      { id: "as_moderne",  label: "Dynamic Contemporary Lounge",  desc: "Modular L-shaped sectional, sculptural coffee tables, and bold architectural accent walls", img: [cdn, cdn1, cdn2, cdn3, cdn4] },
      { id: "as_luxe",     label: "High-Luxe Diplomatic Salon",  desc: "Italian full-grain leather, velvet armchairs, architectural chandelier, and marble accents", img: [par, par1, par2, par3, par4] },
      { id: "as_famille",  label: "Seamless Open-Plan Family Hub",desc: "Continuous flow between dining, living, and show kitchen with high-durability modern furnishings", img: [fon, fon1, fon2, fon3] },
    ]
  },
  cuisine_style: {
    id: "cuisine_style", icon: "🍳", label: "Kitchen Style",
    title: "Kitchen Architecture & Cabinetry",
    subtitle: "Balancing high-performance culinary preparation with show-stopping modern aesthetics",
    options: [
      { id: "cs_ouverte",  label: "Open Island Show Kitchen",     desc: "Expansive central quartz island with waterfall edges, breakfast bar seating, and open lounge view", img: [coss, coss1, coss2, coss3, coss4] },
      { id: "cs_fermee",   label: "Enclosed High-Duty Scullery",  desc: "Dedicated heavy-cooking wet kitchen with massive quartz counters and heavy commercial ventilation", img: [cff, cff1, cff2, cff3] },
      { id: "cs_bois",     label: "Natural Oak & Quartz Surfaces",desc: "Fluted natural wood cabinet fronts paired with seamless Calacatta quartz countertops", img: [cbp, cbp1, cbp2, cbp3, cbp4] },
      { id: "cs_blanche",  label: "Seamless Clean White Minimalist",desc: "Handleless J-pull cabinets in matte white with integrated concealed smart appliances", img: [cbe, cbe1, cbe2, cbe3, cbe4] },
      { id: "cs_sombre",   label: "Matte Charcoal & Brushed Brass",desc: "Anti-fingerprint dark cabinets with knurled brass hardware and dark honed granite worktops", img: [cnmp, cnmp1, cnmp2, cnmp3] },
    ]
  },
  chambre_atmo: {
    id: "chambre_atmo", icon: "🛏️", label: "Master Suite",
    title: "Master Sanctuary & Suite Atmosphere",
    subtitle: "A peaceful private haven engineered for restorative sleep and quiet luxury",
    options: [
      { id: "ca_doux",     label: "Serene & Soothing Neutrals",   desc: "Upholstered vertical fluted bedhead, crisp Egyptian cotton linens, and blackout floor drapery", img: [das, das1, das2, das3] },
      { id: "ca_nordique", label: "Nordic Sunlight Sanctuary",    desc: "Light natural ash wood, warm white tones, shearling textures, and maximum natural day-lighting", img: [nn, nn1, nn2, nn3, nn4] },
      { id: "ca_contemp",  label: "Linear Architectural Suite",   desc: "Integrated floating nightstands, backlit bedside feature panel, and sleek low-profile bedframe", img: [cdcn, cdcn1, cdcn2, cdcn3] },
      { id: "ca_suite",    label: "5-Star Boutique Hotel Suite",  desc: "High-density plush king mattress, private reading nook, integrated dressing alcove, and mood glow", img: [she, she1, she2, she3, she4] },
      { id: "ca_sombre",   label: "Moody Dramatic Cocoon",        desc: "Deep petroleum or charcoal walls, warm brass reading spots, and an intimate hotel cocoon vibe", img: [csae, csae1, csae2, csae3] },
    ]
  },
  sdb_style: {
    id: "sdb_style", icon: "🚿", label: "Bathroom & Spa",
    title: "Master Bathroom & Wellness Wetroom",
    subtitle: "From clean utilitarian comfort to your own private executive spa sanctuary",
    options: [
      { id: "sb_propre",   label: "Functional Minimalist Porcelain", desc: "White subway ceramic, floating single-sink vanity, and frameless glass shower enclosure", img: [spap, spap1, spap2, spap3] },
      { id: "sb_italienne",label: "Flush Italian Walk-In Wetroom",  desc: "Zero-threshold walk-in shower, linear floor drain, and massive 80×160 rectified porcelain wall tiles", img: [die, die1, die2, die3] },
      { id: "sb_naturel",  label: "Organic Teak Wood & River Stone",desc: "Moisture-sealed teak wood vanity, natural stone vessel sinks, and organic warm atmosphere", img: [sbapn, sbapn1, sbapn2, sbapn3] },
      { id: "sb_marbre",   label: "Floor-to-Ceiling Marble Spa",   desc: "Full-height polished marble walls, freestanding soaking tub, and brushed gold thermostatic rain shower", img: [smpn, smpn1, smpn2, smpn3] },
      { id: "sb_sombre",   label: "Moody Charcoal & Brushed Bronze",desc: "Anthracite slate tiles, matte black fixtures, and indirect warm LED niches for evening relaxation", img: [ssr, ssr1, ssr2, ssr3] },
    ]
  },
  eclairage: {
    id: "eclairage", icon: "💡", label: "Lighting Scheme",
    title: "Architectural Lighting Philosophy",
    subtitle: "Lighting dictates room dimensions, visual warmth, and diurnal rhythm",
    options: [
      { id: "ecl_naturel",  label: "Maximum Daylight Fenestration", desc: "Floor-to-ceiling panoramic glass windows, solar-optimized orientation, and sheer drapery", img: [mdln, mdln1, mdln2, mdln3] },
      { id: "ecl_spots",    label: "Recessed Architectural Spotlights",desc: "Anti-glare high-CRI recessed ceiling downlights with multi-zone dimming controls", img: [sez, sez1, sez2, sez3] },
      { id: "ecl_indirect", label: "Concealed LED Shadow-Gaps",     desc: "Zero visible light bulbs — soft indirect cove wash around ceiling perimeters and baseboards", img: [libe, libe1, libe2, libe3] },
      { id: "ecl_lustre",   label: "Sculptural Statement Chandelier", desc: "Central designer pendant focal point over dining and living areas with brushed gold brass arms", img: [lasd, lasd1, lasd2, lasd3] },
      { id: "ecl_mixte",    label: "Full Smart Scene Orchestration",desc: "Smart-switched scenes (Morning, Entertainment, Cinema, Night) blending spots, coves, and lamps", img: [ems, ems1, ems2, ems3] },
    ]
  },
  rangement: {
    id: "rangement", icon: "🗄️", label: "Custom Joinery",
    title: "Storage Solutions & Built-In Joinery",
    subtitle: "Clutter-free living through integrated precision-fitted cabinetry",
    options: [
      { id: "rng_encastre", label: "Flush Wall-to-Wall Fitted Wardrobes", desc: "Full-height floor-to-ceiling lacquered wardrobes that blend seamlessly into wall architecture", img: [pesm, pesm1, pesm2, pesm3] },
      { id: "rng_dressing",  label: "Walk-In Dressing Room with Glass Doors",desc: "Dedicated dressing salon with smoked glass cabinet doors, integrated LED display shelves, and island", img: [dcd, dcd1, dcd2, dcd3] },
      { id: "rng_ouvert",    label: "Floating Display Shelves & TV Niches", desc: "Recessed drywall alcoves and floating natural wood shelves for curated accessories and books", img: [eod, eod1, eod2, eod3] },
    ]
  },
  mood: {
    id: "mood", icon: "🌅", label: "Mood & Energy",
    title: "Overall Emotional Energy & Ambiance",
    subtitle: "Establish the underlying atmospheric tone before selecting accent finishes",
    options: [
      { id: "mood_chaud",   label: "Warm & Enveloping",          desc: "Warm ochres, honey undertones, and raw terracotta — an inviting, nurturing sanctuary", img: [cae, cae1, cae2, cae3, cae4] },
      { id: "mood_frais",   label: "Crisp & Airy Minimal",       desc: "Pure whites, subtle stone greys, and breezy negative space — expansive and light", img: [faa, faa1, faa2, faa3, faa4] },
      { id: "mood_dramatique",label: "Bold & Dramatic Opulence", desc: "Deep charcoals, moody midnight blues, and rich brass — memorable and courageous", img: [daf, daf1, daf2, daf3, daf4] },
      { id: "mood_naturel", label: "Organic & Biophilic",         desc: "Earthy sages, warm linens, and natural timbers — effortless connection to nature", img: [nao, nao1, nao2, nao3, nao4] },
      { id: "mood_joie",    label: "Vibrant & Eclectic Modern",  desc: "Controlled energetic accent colors and expressive African contemporary art pieces", img: [jac, jac1, jac2, jac3, jac4] },
    ]
  },
  mur_accent: {
    id: "mur_accent", icon: "🎨", label: "Accent Walls",
    title: "Statement Accent Wall Treatments",
    subtitle: "A single masterfully treated wall anchors the focal balance of each room",
    options: [
      { id: "ma_uni",      label: "Monochromatic Contrast Wall",  desc: "A single bold architectural paint color contrasting against warm neutral surrounding walls", img: [cut, cut1, cut2, cut3, cut4] },
      { id: "ma_brique",   label: "Exposed Natural Clay Brickwork",desc: "Textured kiln-fired brick slips giving depth, industrial honesty, and rich acoustic damping", img: [ban, ban1, ban2, ban3] },
      { id: "ma_lambris",  label: "Vertical Timber Slat Wall",    desc: "Acoustic oak or walnut slats creating fine linear shadow lines behind the media console or bed", img: [lbv, lbv1, lbv2, lbv3] },
      { id: "ma_papier",   label: "Bespoke Botanical Wall Covering",desc: "Large-scale botanical or geometric designer wallpaper creating an immersive mural landscape", img: [ppm1, ppm2, ppm3, ppm4, ppm5] },
      { id: "ma_beton",    label: "Industrial Micro-Cement Screed", desc: "Hand-applied cementitious screed with subtle trowel marks for a modern loft statement", img: [bcem, bcem1, bcem2, bcem3] },
    ]
  },
  textiles: {
    id: "textiles", icon: "🧶", label: "Fabrics & Textiles",
    title: "Textiles, Upholstery & Tactile Materials",
    subtitle: "Tactile fabrics bring tactile comfort, softness, and acoustic damping",
    options: [
      { id: "tex_lin",     label: "Organic Linen & Cotton Slub",  desc: "Natural washed linen slipcovers, cotton cushions, and jute floor rugs — breezy and organic", img: [lacn, lacn1, lacn2, lacn3] },
      { id: "tex_velours", label: "Rich Velvet & Brushed Suede",   desc: "Plush velvet sofas with deep jewel tones and satin pillows for opulent evening luxury", img: [vav, vav1, vav2, vav3] },
      { id: "tex_cuir",    label: "Full-Grain Saddle Leather",    desc: "Aged cognac or espresso leather upholstery that patinas beautifully and cleans effortlessly", img: [cas, cas1, cas2, cas3] },
      { id: "tex_boucle",  label: "Cozy Wool-Bouclé & Chunky Knit",desc: "Textured bouclé occasional armchairs and wool throws for cloud-like softness", img: [balt, balt1, balt2, balt3] },
      { id: "tex_mixte",   label: "Layered Multi-Texture Mix",    desc: "Curated pairing of leather armchairs, bouclé sofa, linen drapery, and woven wool rugs", img: [mme, mme1, mme2, mme3, mme4] },
    ]
  },
  luminaires: {
    id: "luminaires", icon: "🕯️", label: "Fixtures & Pendants",
    title: "Decorative Lighting Sculptures",
    subtitle: "Lighting fixtures act as room jewelry, providing visual identity day and night",
    options: [
      { id: "lum_lustre",  label: "Sculptural Central Chandelier", desc: "A grand statement centerpiece in blown glass, brushed brass, or woven rattan", img: [glc, glc1, glc2, glc3] },
      { id: "lum_suspension",label: "Linear Multi-Cluster Pendants",desc: "Cascading drop pendants in varying heights over kitchen islands or dining tables", img: [sm1, sm2, sm3] },
      { id: "lum_appliques",label: "Architectural Wall Sconces",    desc: "Up-and-down ambient wall wash fixtures framing art pieces, headboards, and corridors", img: [amd, amd1, amd2, amd3] },
      { id: "lum_lampes",  label: "Curated Floor & Table Lamps",   desc: "Eye-level accent lighting that creates intimate, glare-free conversational seating zones", img: [ldsac, ldsac1, ldsac2, ldsac3] },
    ]
  },
  vegetal: {
    id: "vegetal", icon: "🌿", label: "Indoor Botanicals",
    title: "Indoor Biophilia & Greenery",
    subtitle: "Living greenery purifies indoor air and introduces natural organic vitality",
    options: [
      { id: "veg_minima",  label: "Sculptural Statement Plants",   desc: "2 or 3 tall indoor specimen plants (Fiddle Leaf Fig, Bird of Paradise) in ceramic planters", img: [qpc, qpc1, qpc2, qpc3] },
      { id: "veg_mur",     label: "Preserved Moss & Botanical Wall",desc: "Zero-maintenance stabilized acoustic moss art wall — rich organic texture without watering", img: [mvotm, mvotm1, mvotm2, mvotm3] },
      { id: "veg_aucun",   label: "Clean Sculptural Mineral Look", desc: "A purely architectural interior focusing on stone, timber, metal, and light without foliage", img: [sv, sv1, sv2, sv3] },
    ]
  }
};

// ── RENOVATION SCOPE SELECTOR (HOME RENOVATION SERVICE) ────────────────────
export const RENOVATION_SPACES = [
  { id: "bath",     title: "Bathrooms & Spa Wetrooms",   desc: "Walk-in wetrooms, floating vanities, Italian porcelain wall tiling, and rain showers", icon: "ShowerHead" },
  { id: "flooring", title: "Floors & Architectural Surfaces", desc: "Tile replacement, floor leveling, 60x120 porcelain, Italian marble, or hardwood parquet", icon: "Layers" },
  { id: "kitchen",  title: "Gourmet Kitchen & Cabinetry", desc: "Custom soft-close cabinetry, quartz waterfall island, scullery, and plumbing", icon: "Utensils" },
  { id: "living",   title: "Living & Dining Lounge",     desc: "Open-concept layout, seating ambience, architectural focal point, and entertainment space", icon: "Sofa" },
  { id: "bedroom",  title: "Master Suite & Bedrooms",    desc: "Bespoke fluted headboard wall, integrated nightstands, and tranquil retreat atmosphere", icon: "Bed" },
  { id: "walls",    title: "Interior Walls & Finishes",  desc: "Smooth acrylic paint screeding, exposed brick slips, acoustic timber slats, and stucco", icon: "Paintbrush" },
  { id: "ceilings", title: "Ceilings & POP Lighting",    desc: "Gypsum POP drop trays, perimeter LED shadow-gap coves, and timber ceiling baffles", icon: "Sparkles" },
  { id: "facade",   title: "Exterior Façade & Roofing",  desc: "Gerard stone-coated roofing upgrade, modern exterior stucco, eaves, and architectural trim", icon: "Home" },
  { id: "outdoor",  title: "Outdoor Grounds & Compound", desc: "Perimeter block wall, motorized gate, interlocking cobblestone, pergola, and terrace", icon: "Trees" },
  { id: "lighting", title: "Lighting Fixtures & Pendants", desc: "Sculptural central chandeliers, magnetic track lights, linear island pendants, and sconces", icon: "Lamp" },
];

