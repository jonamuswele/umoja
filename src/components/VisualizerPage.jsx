import { useState, useEffect, useRef } from "react";
import tts  from '../assets/tole.jfif';
import tts1  from '../assets/tole2.jfif';
import tts2   from '../assets/tole3.jfif';
import tts3   from '../assets/tole4.jfif';
import ovh   from '../assets/overhung3.jfif';
import ovh1  from '../assets/overhung2.jfif';
import ovh2   from '../assets/overhung.jfif';
import btp   from '../assets/terrasse.jfif';
import btp1   from '../assets/terrasse2.jfif';
import btp2   from '../assets/terrasse3.jfif';
import mrb   from '../assets/balcony.jfif';
import mrb1   from '../assets/balcony1.jfif';
import mrb2   from '../assets/balcony2.jfif';
import mrb3   from '../assets/balcony3.jfif';
import vc   from '../assets/archi.jfif';
import vc1  from '../assets/archi1.jfif';
import vc2   from '../assets/archi2.jfif';
import rpc   from '../assets/majestic.jfif';
import rpc1   from '../assets/majestic1.jfif';
import rpc2   from '../assets/majestic2.jfif';
import rpc3  from '../assets/majestic3.jfif';
import cc   from '../assets/carreaux.jfif';
import cc1   from '../assets/carreaux1.jfif';
import cc2   from '../assets/carreaux2.jfif';
import gpn   from '../assets/granite.jfif';
import gpn1 from '../assets/granite1.jfif';
import gpn2  from '../assets/granite2.jfif';
import gpn3 from '../assets/granite3.jfif';
import gpn4 from '../assets/granite4.jfif';
import bpf   from '../assets/wood floor.jfif';
import bpf1  from '../assets/wood floor1.jfif';
import bpf2  from '../assets/wood floor2.jfif';
import bpf3 from '../assets/wood floor3.jfif';
import migi   from '../assets/import marble.jfif';
import migi1  from '../assets/import marble1.jfif';
import migi2 from '../assets/import marble2.jfif';
import migi3  from '../assets/import marble3.jfif';
import bcmc  from '../assets/polished concrete.jfif';
import bcmc1  from '../assets/polished concrete1.jfif';
import bcmc2  from '../assets/polished concrete2.jfif';
import bcmc3  from '../assets/polished concrete3.jfif';
import mod   from '../assets/mosaic.jfif';
import mod1   from '../assets/mosaic1.jfif';
import mod2  from '../assets/mosaic2.jfif';
import mod3    from '../assets/mosaic3.jfif';
import elp   from '../assets/smoothpaintwall.jfif';
import elp1  from '../assets/smoothpaintwall1.jfif';
import elp2   from '../assets/smoothpaintwall2.jfif';
import elp3   from '../assets/smoothpaintwall3.jfif';
import ctt   from '../assets/crepi.jfif';
import ctt1   from '../assets/crepi1.jfif';
import ctt2   from '../assets/crepi2.jfif';
import ctt3  from '../assets/crepi3.jfif';
import ctt4   from '../assets/crepi4.jfif';
import bad   from '../assets/expobrick.jfif';
import bad1  from '../assets/expobrick1.jfif';
import bad2   from '../assets/expobrick2.jfif';
import bad3   from '../assets/expobrick3.jfif';
import lbm  from '../assets/expowall.jfif';
import lbm1   from '../assets/expowall1.jfif';
import lbm2   from '../assets/expowall2.jfif';
import lbm3   from '../assets/expowall3.jfif';
import lbm4   from '../assets/expowall4.jfif';
import smd1    from '../assets/expomarble1.jfif';
import smd2    from '../assets/expomarble2.jfif';
import smd3    from '../assets/expomarble3.jfif';
import smd4    from '../assets/expomarble4.jfif';
import dbp  from '../assets/betonpaint.jfif';
import dbp1  from '../assets/betonpaint1.jfif';
import dbp2   from '../assets/betonpaint2.jfif';
import fppc   from '../assets/corniceceiling.jfif';
import fppc1   from '../assets/corniceceiling1.jfif';
import fppc2   from '../assets/corniceceiling2.jfif';
import fppc3   from '../assets/corniceceiling3.jfif';
import fppc4   from '../assets/corniceceiling4.jfif';
import fpld   from '../assets/ledceiling.jfif';
import fpld1   from '../assets/ledceiling1.jfif';
import fpld2   from '../assets/ledceiling2.jfif';
import fpld3   from '../assets/ledceiling3.jfif';
import fpld4   from '../assets/ledceiling4.jfif';
import plb   from '../assets/woodceiling.jfif';
import plb1   from '../assets/woodceiling1.jfif';
import plb2    from '../assets/woodceiling2.jfif';
import plb3    from '../assets/woodceiling3.jfif';
import plb4   from '../assets/woodceiling4.jfif';
import dhc   from '../assets/cathedral.jfif';
import dhc1   from '../assets/cathedral1.jfif';
import dhc2   from '../assets/cathedral2.jfif';
import dhc3  from '../assets/cathedral3.jfif';
import dhc4   from '../assets/cathedral4.jfif';
import vac   from '../assets/arcceiling.jfif';
import vac1   from '../assets/arcceiling1.jfif';
import vac2   from '../assets/arcceiling2.jfif';
import vac3   from '../assets/arcceiling3.jfif';
import ebbp   from '../assets/paintstair.jfif';
import ebbp1   from '../assets/paintstair1.jfif';
import ebbp2  from '../assets/paintstair2.jfif';
import edbm  from '../assets/boismetal.jfif';
import edbm1 from '../assets/boismetal1.jfif';
import edbm2  from '../assets/boismetal2.jfif';
import edbm3  from '../assets/boismetal3.jfif';
import edbm4   from '../assets/boismetal4.jfif';
import edbm5   from '../assets/boismetal5.jfif';
import efds  from '../assets/floatstair.jfif';
import efds1   from '../assets/floatstair1.jfif';
import efds2   from '../assets/floatstair2.jfif';
import efds3  from '../assets/floatstair3.jfif';
import efds4   from '../assets/floatstair4.jfif';
import ehm from '../assets/helistair.jfif';
import ehm1 from '../assets/helistair1.jfif';
import ehm2 from '../assets/helistair2.jfif';
import ehm3  from '../assets/helistair3.jfif';
import ehm4 from '../assets/helistair4.jfif';
import gems   from '../assets/grandmarblestair.jfif';
import gems1   from '../assets/grandmarblestair1.jfif';
import gems2   from '../assets/grandmarblestair2.jfif';
import gems3   from '../assets/grandmarblestair3.jfif';
import gems4   from '../assets/grandmarblestair4.jfif';
import gems5   from '../assets/grandmarblestair5.jfif';
import cbpm   from '../assets/betonmetalext.jfif';
import cbpm1   from '../assets/betonmetalext1.jfif';
import cbpm2   from '../assets/betonmetalext2.jfif';
import cbpm3  from '../assets/betonmetalext3.jfif';
import cbpm4   from '../assets/betonmetalext4.jfif';
import cbpm5   from '../assets/betonmetalext5.jfif';
import tdap   from '../assets/extterrasse.jfif';
import tdap1   from '../assets/extterrasse1.jfif';
import tdap2   from '../assets/extterrasse2.jfif';
import tdap3   from '../assets/extterrasse3.jfif';
import tdap4   from '../assets/extterrasse4.jfif';
import jpa  from '../assets/drivegardin.jfif';
import jpa1   from '../assets/drivegardin1.jfif';
import jpa2   from '../assets/drivegardin2.jfif';
import jpa3  from '../assets/drivegardin3.jfif';
import jpa4  from '../assets/drivegardin4.jfif';
import jpa5   from '../assets/drivegardin5.jfif';
import papm   from '../assets/swimpool.jfif';
import papm1  from '../assets/swimpool1.jfif';
import papm2  from '../assets/swimpool2.jfif';
import papm3  from '../assets/swimpool3.jfif';
import papm4  from '../assets/swimpool4.jfif';
import papm5   from '../assets/swimpool5.jfif';
import cac   from '../assets/interior/cac.jfif';
import cac1   from '../assets/interior/cac1.jfif';
import cac2   from '../assets/interior/cac2.jfif';
import cac3   from '../assets/interior/cac3.jfif';
import jen   from '../assets/interior/jen.jfif';
import jen1   from '../assets/interior/jen1.jfif';
import jen2   from '../assets/interior/jen2.jfif';
import jen3   from '../assets/interior/jen3.jfif';
import jen4   from '../assets/interior/jen4.jfif';
import cdn   from '../assets/interior/cdn.jfif';
import cdn1   from '../assets/interior/cdn1.jfif';
import cdn2   from '../assets/interior/cdn2.jfif';
import cdn3   from '../assets/interior/cdn3.jfif';
import cdn4   from '../assets/interior/cdn4.jfif';
import par   from '../assets/interior/par.jfif';
import par1   from '../assets/interior/par1.jfif';
import par2   from '../assets/interior/par2.jfif';
import par3   from '../assets/interior/par3.jfif';
import par4   from '../assets/interior/par4.jfif';
import fon   from '../assets/interior/fon.jfif';
import fon1   from '../assets/interior/fon1.jfif';
import fon2   from '../assets/interior/fon2.jfif';
import fon3   from '../assets/interior/fon3.jfif';
import coss   from '../assets/interior/coss.jfif';
import coss1   from '../assets/interior/coss1.jfif';
import coss2   from '../assets/interior/coss2.jfif';
import coss3   from '../assets/interior/coss3.jfif';
import coss4   from '../assets/interior/coss4.jfif';
import cff   from '../assets/interior/cff.jfif';
import cff1   from '../assets/interior/cff1.jfif';
import cff2   from '../assets/interior/cff2.jfif';
import cff3   from '../assets/interior/cff3.jfif';
import cbp  from '../assets/interior/cbp.jfif';
import cbp1  from '../assets/interior/cbp1.jfif';
import cbp2  from '../assets/interior/cbp2.jfif';
import cbp3  from '../assets/interior/cbp3.jfif';
import cbp4  from '../assets/interior/cbp4.jfif';
import cbe   from '../assets/interior/cbe.jfif';
import cbe1   from '../assets/interior/cbe1.jfif';
import cbe2   from '../assets/interior/cbe2.jfif';
import cbe3   from '../assets/interior/cbe3.jfif';
import cbe4   from '../assets/interior/cbe4.jfif';
import cnmp   from '../assets/interior/cnmp.jfif';
import cnmp1   from '../assets/interior/cnmp1.jfif';
import cnmp2   from '../assets/interior/cnmp2.jfif';
import cnmp3   from '../assets/interior/cnmp3.jfif';
import das   from '../assets/interior/das.jfif';
import das1   from '../assets/interior/das1.jfif';
import das2   from '../assets/interior/das2.jfif';
import das3   from '../assets/interior/das3.jfif';
import nn   from '../assets/interior/nn.jfif';
import nn1   from '../assets/interior/nn1.jfif';
import nn2   from '../assets/interior/nn2.jfif';
import nn3   from '../assets/interior/nn3.jfif';
import nn4   from '../assets/interior/nn4.jfif';
import cdcn   from '../assets/interior/cdcn.jfif';
import cdcn1  from '../assets/interior/cdcn1.jfif';
import cdcn2   from '../assets/interior/cdcn2.jfif';
import cdcn3   from '../assets/interior/cdcn3.jfif';
import she   from '../assets/interior/she.jfif';
import she1   from '../assets/interior/she1.jfif';
import she2   from '../assets/interior/she2.jfif';
import she3   from '../assets/interior/she3.jfif';
import she4   from '../assets/interior/she4.jfif';
import csae   from '../assets/interior/csae.jfif';
import csae1   from '../assets/interior/csae1.jfif';
import csae2   from '../assets/interior/csae2.jfif';
import csae3   from '../assets/interior/csae3.jfif';
import spap   from '../assets/interior/spap.jfif';
import spap1   from '../assets/interior/spap1.jfif';
import spap2   from '../assets/interior/spap2.jfif';
import spap3   from '../assets/interior/spap3.jfif';
import die   from '../assets/interior/die.jfif';
import die1   from '../assets/interior/die1.jfif';
import die2   from '../assets/interior/die2.jfif';
import die3   from '../assets/interior/die3.jfif';
import sbapn   from '../assets/interior/sbapn.jfif';
import sbapn1   from '../assets/interior/sbapn1.jfif';
import sbapn2   from '../assets/interior/sbapn2.jfif';
import sbapn3   from '../assets/interior/sbapn3.jfif';
import smpn   from '../assets/interior/smpn.jfif';
import smpn1   from '../assets/interior/smpn1.jfif';
import smpn2   from '../assets/interior/smpn2.jfif';
import smpn3   from '../assets/interior/smpn3.jfif';
import ssr   from '../assets/interior/ssr.jfif';
import ssr1   from '../assets/interior/ssr1.jfif';
import ssr2   from '../assets/interior/ssr2.jfif';
import ssr3   from '../assets/interior/ssr3.jfif';
import mdln   from '../assets/interior/mdln.jfif';
import mdln1   from '../assets/interior/mdln1.jfif';
import mdln2   from '../assets/interior/mdln2.jfif';
import mdln3   from '../assets/interior/mdln3.jfif';
import sez   from '../assets/interior/sez.jfif';
import sez1   from '../assets/interior/sez1.jfif';
import sez2   from '../assets/interior/sez2.jfif';
import sez3   from '../assets/interior/sez3.jfif';
import libe   from '../assets/interior/libe.jfif';
import libe1   from '../assets/interior/libe1.jfif';
import libe2   from '../assets/interior/libe2.jfif';
import libe3   from '../assets/interior/libe3.jfif';
import lasd   from '../assets/interior/lasd.jfif';
import lasd1   from '../assets/interior/lasd1.jfif';
import lasd2   from '../assets/interior/lasd2.jfif';
import lasd3   from '../assets/interior/lasd3.jfif';
import ems   from '../assets/interior/ems.jfif';
import ems1   from '../assets/interior/ems1.jfif';
import ems2   from '../assets/interior/ems2.jfif';
import ems3   from '../assets/interior/ems3.jfif';
import pesm   from '../assets/interior/pesm.jfif';
import pesm1   from '../assets/interior/pesm1.jfif';
import pesm2   from '../assets/interior/pesm2.jfif';
import pesm3   from '../assets/interior/pesm3.jfif';
import dcd   from '../assets/interior/dcd.jfif';
import dcd1   from '../assets/interior/dcd1.jfif';
import dcd2   from '../assets/interior/dcd2.jfif';
import dcd3   from '../assets/interior/dcd3.jfif';
import eod   from '../assets/interior/eod.jfif';
import eod1   from '../assets/interior/eod1.jfif';
import eod2   from '../assets/interior/eod2.jfif';
import eod3   from '../assets/interior/eod3.jfif';
import cae   from '../assets/color/cae.jfif';
import cae1   from '../assets/color/cae1.jfif';
import cae2   from '../assets/color/cae2.jfif';
import cae3   from '../assets/color/cae3.jfif';
import cae4   from '../assets/color/cae4.jfif';
import faa   from '../assets/color/faa.jfif';
import faa1   from '../assets/color/faa1.jfif';
import faa2   from '../assets/color/faa2.jfif';
import faa3   from '../assets/color/faa3.jfif';
import faa4   from '../assets/color/faa4.jfif';
import daf   from '../assets/color/daf.jfif';
import daf1   from '../assets/color/daf1.jfif';
import daf2   from '../assets/color/daf2.jfif';
import daf3   from '../assets/color/daf3.jfif';
import daf4   from '../assets/color/daf4.jfif';
import nao   from '../assets/color/nao.jfif';
import nao1   from '../assets/color/nao1.jfif';
import nao2   from '../assets/color/nao2.jfif';
import nao3   from '../assets/color/nao3.jfif';
import nao4   from '../assets/color/nao4.jfif';
import jac   from '../assets/color/jac.jfif';
import jac1   from '../assets/color/jac1.jfif';
import jac2   from '../assets/color/jac2.jfif';
import jac3   from '../assets/color/jac3.jfif';
import jac4   from '../assets/color/jac4.jfif';
import cut   from '../assets/color/cut.jfif';
import cut1   from '../assets/color/cut1.jfif';
import cut2   from '../assets/color/cut2.jfif';
import cut3   from '../assets/color/cut3.jfif';
import cut4   from '../assets/color/cut4.jfif';
import ban   from '../assets/color/ban.jfif';
import ban1   from '../assets/color/ban1.jfif';
import ban2   from '../assets/color/ban2.jfif';
import ban3   from '../assets/color/ban3.jfif';
import lbv   from '../assets/color/lbv.jfif';
import lbv1   from '../assets/color/lbv1.jfif';
import lbv2   from '../assets/color/lbv2.jfif';
import lbv3   from '../assets/color/lbv3.jfif';
import ppm   from '../assets/color/ppm.jfif';
import ppm1   from '../assets/color/ppm1.jfif';
import ppm2   from '../assets/color/ppm2.jfif';
import ppm3   from '../assets/color/ppm3.jfif';
import ppm4   from '../assets/color/ppm4.jfif';
import ppm5   from '../assets/color/ppm5.jfif';
import bcem   from '../assets/color/bcem.jfif';
import bcem1   from '../assets/color/bcem1.jfif';
import bcem2   from '../assets/color/bcem2.jfif';
import bcem3   from '../assets/color/bcem3.jfif';
import lacn   from '../assets/color/lacn.jfif';
import lacn1   from '../assets/color/lacn1.jfif';
import lacn2   from '../assets/color/lacn2.jfif';
import lacn3   from '../assets/color/lacn3.jfif';
import vav   from '../assets/color/vav.jfif';
import vav1   from '../assets/color/vav1.jfif';
import vav2   from '../assets/color/vav2.jfif';
import vav3   from '../assets/color/vav3.jfif';
import cas   from '../assets/color/cas.jfif';
import cas1   from '../assets/color/cas1.jfif';
import cas2   from '../assets/color/cas2.jfif';
import cas3   from '../assets/color/cas3.jfif';
import balt   from '../assets/color/balt.jfif';
import balt1   from '../assets/color/balt1.jfif';
import balt2   from '../assets/color/balt2.jfif';
import balt3   from '../assets/color/balt3.jfif';
import mme   from '../assets/color/mme.jfif';
import mme1   from '../assets/color/mme1.jfif';
import mme2   from '../assets/color/mme2.jfif';
import mme3   from '../assets/color/mme3.jfif';
import mme4   from '../assets/color/mme4.jfif';
import glc   from '../assets/color/glc.jfif';
import glc1   from '../assets/color/glc1.jfif';
import glc2   from '../assets/color/glc2.jfif';
import glc3   from '../assets/color/glc3.jfif';
import sm1   from '../assets/color/sm1.jfif';
import sm2   from '../assets/color/sm2.jfif';
import sm3   from '../assets/color/sm3.jfif';
import amd   from '../assets/color/amd.jfif';
import amd1   from '../assets/color/amd1.jfif';
import amd2   from '../assets/color/amd2.jfif';
import amd3   from '../assets/color/amd3.jfif';
import ldsac   from '../assets/color/ldsac.jfif';
import ldsac1   from '../assets/color/ldsac1.jfif';
import ldsac2   from '../assets/color/ldsac2.jfif';
import ldsac3   from '../assets/color/ldsac3.jfif';
import qpc   from '../assets/color/qpc.jfif';
import qpc1   from '../assets/color/qpc1.jfif';
import qpc2   from '../assets/color/qpc2.jfif';
import qpc3   from '../assets/color/qpc3.jfif';
import mvotm   from '../assets/color/mvotm.jfif';
import mvotm1   from '../assets/color/mvotm1.jfif';
import mvotm2   from '../assets/color/mvotm2.jfif';
import mvotm3   from '../assets/color/mvotm3.jfif';
import sv   from '../assets/color/sv.jfif';
import sv1   from '../assets/color/sv1.jfif';
import sv2   from '../assets/color/sv2.jfif';
import sv3   from '../assets/color/sv3.jfif';


// ─────────────────────────────────────────────────────────────────────────────
// PALETTES (shared)
// ─────────────────────────────────────────────────────────────────────────────
const COLOR_PALETTES = {
  obsidian:   { name:"Obsidien Volcanique", hex:"#1c1c1c", accent:"#c9a84c", wall:"#1c1c1c", label:"Sombre & Luxueux",     finish:"Mat Velouté" },
  alabaster:  { name:"Albâtre Crème",       hex:"#f0ebe0", accent:"#b8956a", wall:"#f0ebe0", label:"Minimaliste Clair",    finish:"Satiné" },
  terracotta: { name:"Terre Cuite",         hex:"#c4714a", accent:"#8b5e3c", wall:"#c4714a", label:"Chaud & Naturel",      finish:"Mat Velouté" },
  velvet:     { name:"Indigo Métropole",    hex:"#2c3e6b", accent:"#7c9bc4", wall:"#2c3e6b", label:"Urbain & Audacieux",   finish:"Satiné" },
  sage:       { name:"Vert Sauge",          hex:"#7a9e7e", accent:"#4a6b4e", wall:"#7a9e7e", label:"Zen & Naturel",        finish:"Mat" },
  champagne:  { name:"Champagne Prestige",  hex:"#e8d5b0", accent:"#b8913a", wall:"#e8d5b0", label:"Élégant & Doré",       finish:"Brillant" },
  blanc:      { name:"Blanc Pur",           hex:"#F8F8F8", accent:"#0F2C59", wall:"#F8F8F8", label:"Classique & Universel",finish:"Satiné" },
  gris:       { name:"Gris Ardoise",        hex:"#64748B", accent:"#CBD5E1", wall:"#64748B", label:"Sobre & Contemporain", finish:"Mat" },
};

// ─────────────────────────────────────────────────────────────────────────────
// PATH 1 — CONSTRUIRE / RÉNOVER
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS_COMPLET = {
  facade: {
    id:"facade", icon:"🏠", label:"Façade & Toiture",
    title:"La façade et le type de toiture",
    subtitle:"Ce choix définit le caractère extérieur de votre construction pour des décennies",
    options:[
      { id:"fac_gable1",  label:"Toit Triangulaire Simple",      desc:"Tôle ou tuile sur structure béton — la solution la plus répandue et économique",        img:[tts,tts1,tts2,tts3] },
      { id:"fac_gable2",  label:"Maison Toit 2 Pentes Crépi",    desc:"Crépi blanc ou gris, débord de toiture classique, robuste et durable",                  img:[ovh,ovh1,ovh2] },
      { id:"fac_bungalow",label:"Bungalow Toit Plat R+0",        desc:"Volume horizontal, toit terrasse exploitable, idéal pour extension future en R+1",      img:[btp,btp1,btp2] },
      { id:"fac_r1",      label:"Maison R+1 avec Balcon",        desc:"Deux niveaux, balcon filant, façade rythmée — le classique urbain de Kinshasa",         img:[mrb,mrb1,mrb2,mrb3] },
      { id:"fac_contemp", label:"Villa Contemporaine",            desc:"Volumes géométriques, toiture en bac acier, composition architecturale forte",         img:[vc,vc1,vc2] },
      { id:"fac_prestige",label:"Résidence Prestige Colonnade",   desc:"Colonnades, grand porche d'entrée, présence majestuese en façade",                    img:[rpc,rpc1,rpc2,rpc3] },
    ]
  },
  sols: {
    id:"sols", icon:"⬛", label:"Sols & Revêtements",
    title:"Les sols de votre résidence",
    subtitle:"Le choix du sol détermine la durabilité, l'entretien et l'ambiance de chaque pièce",
    options:[
      { id:"sol_carrelage", label:"Carrelage Céramique 60×60",  desc:"Résistant, facile à entretenir, disponible localement — le choix le plus pratique",     img:[cc,cc1,cc2] },
      { id:"sol_granit",    label:"Granit Poli Naturel",         desc:"Pierre naturelle importée, très résistante, prestige durable et facile d'entretien",    img:[gpn,gpn1,gpn2,gpn3,gpn4] },
      { id:"sol_parquet",   label:"Parquet Bois Flottant",       desc:"Chaleur et confort, idéal pour les chambres et séjours, entretien soigné requis",       img:[bpf,bpf1,bpf2,bpf3] },
      { id:"sol_marbre",    label:"Marbre Importé Grand Format",  desc:"Luxe absolu, dalles 80×80 ou 120×60, effets veinés spectaculaires",                    img:[migi,migi1,migi2,migi3] },
      { id:"sol_beton",     label:"Béton Ciré ou Micro-Ciment",  desc:"Style loft contemporain, jointoyage invisible, très tendance et robuste",               img:[bcmc,bcmc1,bcmc2,bcmc3] },
      { id:"sol_mosaique",  label:"Mosaïque Décorative",          desc:"Motifs géométriques, salle de bain ou entrée, fort caractère artisanal",               img:[mod,mod1,mod2,mod3] },
    ]
  },
  structure: {
    id:"structure", icon:"🧱", label:"Finitions Murales",
    title:"Les finitions intérieures des murs",
    subtitle:"La texture de vos murs — entre sobriété et caractère",
    options:[
      { id:"mur_enduit",    label:"Enduit Lisse Peint",           desc:"La base propre et neutre — sobre, économique, facile à repeindre plus tard",           img:[elp,elp1,elp2,elp3] },
      { id:"mur_crepi",     label:"Crépi Taloché Texturé",        desc:"Texture visible, accroche la lumière, donne un caractère au mur sans surcoût",         img:[ctt,ctt1,ctt2,ctt3,ctt4] },
      { id:"mur_brique",    label:"Brique Apparente Décorative",  desc:"Mur accent en brique vue ou en revêtement brique — matière brute et caractère fort",  img:[bad,bad1,bad2,bad3] },
      { id:"mur_bois",      label:"Lambris Bois Mural",           desc:"Panneaux bois naturel ou MDF plaqué, chaleur immédiate, idéal pour chambre principale",img:[lbm,lbm1,lbm2,lbm3,lbm4] },
      { id:"mur_stuc",      label:"Stuc Marbre Décoratif",        desc:"Effet marbre appliqué à la main, brillance luxueuse, entrée ou salon prestige",        img:[smd1,smd2,smd3,smd4] },
    ]
  },
  plafond: {
    id:"plafond", icon:"✨", label:"Plafond",
    title:"Le type de plafond",
    subtitle:"La hauteur et le traitement du plafond transforment la perception du volume",
    options:[
      { id:"pla_simple",  label:"Dalle Béton Peinte",             desc:"Le plus économique — béton banché apparent ou enduit, hauteur standard 2.7m",          img:[dbp,dbp1,dbp2] },
      { id:"pla_placo",   label:"Faux Plafond Plâtre Corniche",   desc:"Faux plafond descendu avec corniche moulurée — finition soignée et classique",        img:[fppc,fppc1,fppc2,fppc3,fppc4] },
      { id:"pla_led",     label:"Faux Plafond LED Décoratif",     desc:"Caissons lumineux, spots encastrés, bandeau LED indirect — ambiance maîtrisée",        img:[fpld,fpld1,fpld2,fpld3,fpld4] },
      { id:"pla_lambris", label:"Plafond Lambris Bois",           desc:"Lames bois ou PVC imitation bois — chaleur immédiate, acoustique améliorée",           img:[plb,plb1,plb2,plb3,plb4] },
      { id:"pla_double",  label:"Double Hauteur Cathédrale",      desc:"Vide sur séjour ou entrée — volume spectaculaire, signature architecturale forte",      img:[dhc,dhc1,dhc2,dhc3,dhc4] },
      { id:"pla_voute",   label:"Voûte en Arc ou Coffre",         desc:"Plafond cintré ou caisson central — élégance architecturale, travail artisanal",       img:[vac,vac1,vac2,vac3] },
    ]
  },
  escalier: {
    id:"escalier", icon:"🪜", label:"Escalier",
    title:"Le type d'escalier",
    subtitle:"Structure, matière et forme — l'escalier est souvent la première chose qu'on remarque",
    options:[
      { id:"esc_beton",      label:"Escalier Béton Brut Peint",     desc:"Le plus solide et économique — béton coulé, garde-corps métal simple",               img:[ebbp,ebbp1,ebbp2] },
      { id:"esc_bois",       label:"Escalier Droit Bois & Métal",   desc:"Contremarches bois, limon métal — chaleur et résistance, finition soignée",          img:[edbm,edbm1,edbm2,edbm3,edbm4,edbm5] },
      { id:"esc_flottant",   label:"Escalier Flottant Design",       desc:"Marches suspendues en bois ou marbre, garde-corps verre — impact visuel fort",       img:[efds,efds1,efds2,efds3,efds4] },
      { id:"esc_spiral",     label:"Escalier Hélicoïdal Métal",      desc:"Colonne centrale, encombrement minimal — caractère et gain de surface au sol",       img:[ehm,ehm1,ehm2,ehm3,ehm4] },
      { id:"esc_monumental", label:"Grand Escalier Marbre",          desc:"Double volée ou escalier impérial — la signature d'une résidence prestige",          img:[gems,gems1,gems2,gems3,gems4,gems5] },
    ]
  },
  exterieur: {
    id:"exterieur", icon:"🌿", label:"Extérieurs",
    title:"Les espaces extérieurs",
    subtitle:"Clôture, portail, terrasse et jardins — l'entrée en matière de votre propriété",
    options:[
      { id:"ext_simple",   label:"Clôture Béton & Portail Métal",  desc:"Mur plein ou grillage, portail battant — sécurité simple et durable",                img:[cbpm,cbpm1,cbpm2,cbpm3,cbpm4,cbpm5] },
      { id:"ext_terrasse", label:"Terrasse Dallée avec Pergola",    desc:"Prolongement couvert du séjour sur l'extérieur — idéal pour recevoir",               img:[tdap,tdap1,tdap2,tdap3,tdap4] },
      { id:"ext_jardin",   label:"Jardin Paysagé & Allée",         desc:"Pelouse, allée pavée, plantation — un cadre de vie végétal soigné",                  img:[jpa,jpa1,jpa2,jpa3,jpa4,jpa5] },
      { id:"ext_piscine",  label:"Piscine & Plage Minérale",        desc:"Bassin béton, margelles carrelées, éclairage nocturne — prestige résidentiel",       img:[papm,papm1,papm2,papm3,papm4,papm5] },
    ]
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PATH 2 — AMÉNAGER L'INTÉRIEUR
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS_INTERIEUR = {
  ambiance_salon: {
    id:"ambiance_salon", icon:"🛋️", label:"Ambiance Salon",
    title:"Quelle ambiance pour votre salon ?",
    subtitle:"Votre salon dit qui vous êtes — choisissez l'atmosphère qui vous correspond",
    options:[
      { id:"as_cosy",     label:"Cosy & Chaleureux",         desc:"Canapés moelleux, textiles chauds, luminaires tamisés — un salon où l'on reste",           img:[cac,cac1,cac2,cac3] },
      { id:"as_japandi",  label:"Japandi Épuré",              desc:"Lignes basses, bois clair, espace respirant — la sérénité japonaise adaptée à l'Afrique",  img:[jen,jen1,jen2,jen3,jen4] },
      { id:"as_moderne",  label:"Contemporain Dynamique",     desc:"Canapé en L, table basse design, accent mur coloré — vivant et affirmé",                   img:[cdn,cdn1,cdn2,cdn3,cdn4] },
      { id:"as_luxe",     label:"Prestige & Réception",       desc:"Sofas cuir ou velours, éclairage architectural, ambiance grand salon de réception",        img:[par,par1,par2,par3,par4] },
      { id:"as_famille",  label:"Familial Ouvert",            desc:"Salon-salle à manger en continuité, mobilier robuste, rangements intégrés",                 img:[fon,fon1,fon2,fon3 ] },
    ]
  },
  cuisine_style: {
    id:"cuisine_style", icon:"🍳", label:"Style Cuisine",
    title:"Le style de votre cuisine",
    subtitle:"Entre praticité quotidienne et esthétique soignée",
    options:[
      { id:"cs_ouverte",  label:"Cuisine Ouverte sur Séjour",  desc:"Îlot central ou bar comptoir, continuité visuelle avec le salon — convivial",             img:[coss,coss1,coss2,coss3,coss4 ] },
      { id:"cs_fermee",   label:"Cuisine Fermée Fonctionnelle", desc:"Pièce séparée, plan de travail généreux, tout à sa place — pragmatique et efficace",     img:[cff,cff1,cff2,cff3] },
      { id:"cs_bois",     label:"Cuisine Bois & Pierre",        desc:"Façades bois naturel, plan pierre ou granit, chaleur artisanale contemporaine",           img: [cbp,cbp1,cbp2,cbp3,cbp4] },
      { id:"cs_blanche",  label:"Cuisine Blanche Épurée",       desc:"Tout blanc, poignées intégrées, carrelage métro — intemporelle et lumineuse",            img:[cbe,cbe1,cbe2,cbe3,cbe4] },
      { id:"cs_sombre",   label:"Cuisine Noire Mate Prestige",  desc:"Façades anthracite mat, robinetterie dorée, plan marbre — le luxe assumé",               img:[cnmp,cnmp1,cnmp2,cnmp3] },
    ]
  },
  chambre_atmo: {
    id:"chambre_atmo", icon:"🛏️", label:"Chambre Principale",
    title:"L'atmosphère de votre chambre principale",
    subtitle:"L'endroit où vous commencez et terminez chaque journée — il doit vous ressembler",
    options:[
      { id:"ca_doux",     label:"Douceur & Sérénité",          desc:"Linge blanc, tête de lit capitonnée, rideaux longs — une chambre comme un souffle",      img:[das,das1,das2,das3] },
      { id:"ca_nordique", label:"Nordique Naturel",             desc:"Bois clair, blanc cassé, plaid texturé, lumière naturelle maximum",                       img:[nn,nn1,nn2,nn3,nn4] },
      { id:"ca_contemp",  label:"Contemporaine Design",         desc:"Tête de lit intégrée au mur, chevet suspendu, ambiance graphique maîtrisée",              img:[cdcn,cdcn1,cdcn2,cdcn3] },
      { id:"ca_suite",    label:"Suite Hôtel 5 Étoiles",        desc:"Literie haute densité, dressing intégré, salon de chevet — dormir comme en voyage",      img:[she,she1,she2,she3,she4] },
      { id:"ca_sombre",   label:"Chambre Sombre & Enveloppante",desc:"Murs foncés, éclairage point chaud, ambiance cocon dramatique et intime",                img:[csae,csae1,csae2,csae3] },
    ]
  },
  sdb_style: {
    id:"sdb_style", icon:"🚿", label:"Salle de Bain",
    title:"La salle de bain de vos envies",
    subtitle:"Du fonctionnel soigné au spa privé — définissez votre rituel",
    options:[
      { id:"sb_propre",   label:"Salle Propre & Pratique",      desc:"Faïence blanc, meuble vasque simple, douche efficace — le confort sans superflu",        img:[spap,spap1,spap2,spap3] },
      { id:"sb_italienne",label:"Douche Italienne Épurée",       desc:"Receveur affleurant, paroi verre, carrelage grand format — modernité absolue",          img:[die,die1,die2,die3] },
      { id:"sb_naturel",  label:"Salle Bois & Pierre Naturelle", desc:"Pierre naturelle, bois teck, vasque à poser — chaleur organique et spa quotidien",      img:[sbapn,sbapn1,sbapn2,sbapn3] },
      { id:"sb_marbre",   label:"Salle Marbre Prestige",         desc:"Marbre du sol au plafond, robinetterie dorée, baignoire îlot — summum du luxe",         img:[smpn,smpn1,smpn2,smpn3] },
      { id:"sb_sombre",   label:"Salle Sombre Raffinée",         desc:"Carrelage anthracite, cuivre brossé, ambiance spa haut de gamme nocturne",              img:[ssr,ssr1,ssr2,ssr3] },
    ]
  },
  eclairage: {
    id:"eclairage", icon:"💡", label:"Éclairage",
    title:"Votre philosophie d'éclairage",
    subtitle:"La lumière change tout — elle définit l'heure, l'humeur et le volume d'une pièce",
    options:[
      { id:"ecl_naturel",  label:"Maximum de Lumière Naturelle",  desc:"Grandes ouvertures, rideaux fins, orientation solaire — le jour entre chez vous",      img:[mdln,mdln1,mdln2,mdln3] },
      { id:"ecl_spots",    label:"Spots Encastrés Zénithaux",     desc:"Grille de spots LED dimmables au plafond — polyvalent et propre",                     img:[sez,sez1,sez2,sez3] },
      { id:"ecl_indirect", label:"Lumière Indirecte Bandeau LED",  desc:"Corniche lumineuse, plafond indirect — ambiance douce sans source visible",           img:[libe,libe1,libe2,libe3] },
      { id:"ecl_lustre",   label:"Lustres & Suspensions Design",   desc:"Pièce centrale au plafond, déclaration stylistique forte, chaleur visuelle",          img:[lasd,lasd1,lasd2,lasd3] },
      { id:"ecl_mixte",    label:"Éclairage Mixte Scénographié",   desc:"Spots + bandeau + appliques — chaque pièce a ses scènes lumineuses",                  img:[ems,ems1,ems2,ems3] },
    ]
  },
  rangement: {
    id:"rangement", icon:"🗄️", label:"Rangements",
    title:"L'organisation et les rangements",
    subtitle:"Un intérieur bien rangé, c'est un intérieur qu'on habite mieux",
    options:[
      { id:"rng_encastre", label:"Placards Encastrés sur Mesure", desc:"Bibliothèques, dressings et placards intégrés dans les murs — zéro encombrement",     img:[pesm,pesm1,pesm2,pesm3] },
      { id:"rng_dressing",  label:"Dressing Chambre Dédié",       desc:"Pièce ou alcôve habillée de rangements profonds pour tous les vêtements",             img:[dcd,dcd1,dcd2,dcd3] },
      { id:"rng_ouvert",    label:"Étagères Ouvertes Décoratives", desc:"Niches murales, étagères flottantes — rangement et mise en scène des objets",         img:[eod,eod1,eod2,eod3] },
    ]
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PATH 3 — DÉCORATION & COULEURS
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS_DECO = {
  mood: {
    id:"mood", icon:"🌅", label:"Ambiance Générale",
    title:"Quelle humeur pour votre chez-vous ?",
    subtitle:"Avant les couleurs, choisissez le ressenti que vous voulez créer",
    options:[
      { id:"mood_chaud",   label:"Chaud & Enveloppant",         desc:"Terres, orangés, miel — une maison qui embrasse et réconforte dès l'entrée",            img:[cae,cae1,cae2,cae3,cae4] },
      { id:"mood_frais",   label:"Frais & Aéré",                desc:"Blancs, bleus pâles, verts discrets — légèreté et sensation de grand espace",           img:[faa,faa1,faa2,faa3,faa4] },
      { id:"mood_dramatique",label:"Dramatique & Fort",         desc:"Noirs, bleus profonds, dorés — une maison qui ose et qui marque les esprits",            img:[daf,daf1,daf2,daf3,daf4] },
      { id:"mood_naturel", label:"Naturel & Organique",         desc:"Verts, beiges, bois, lin — la nature rentre chez vous, zéro artifice",                  img:[nao,nao1,nao2,nao3,nao4] },
      { id:"mood_joie",    label:"Joyeux & Coloré",             desc:"Couleurs vives contrôlées, motifs discrets, énergie positive revendiquée",               img:[jac,jac1,jac2,jac3,jac4] },
    ]
  },
  mur_accent: {
    id:"mur_accent", icon:"🎨", label:"Mur Accent",
    title:"Votre mur accent principal",
    subtitle:"Un seul mur bien traité change tout le volume d'une pièce",
    options:[
      { id:"ma_uni",      label:"Couleur Unie Tranchée",         desc:"Un mur dans une couleur forte, les autres dans le ton neutre — simple et efficace",     img:[cut,cut1,cut2,cut3,cut4] },
      { id:"ma_brique",   label:"Brique Apparente Naturelle",    desc:"Revêtement brique ou pierre reconstituée — matière brute et authentique",              img:[ban,ban1,ban2,ban3] },
      { id:"ma_lambris",  label:"Lambris Bois Vertical",         desc:"Lames verticales en bois naturel ou MDF peint — relief, chaleur, caractère",           img:[lbv,lbv1,lbv2,lbv3] },
      { id:"ma_papier",   label:"Papier Peint Motif",            desc:"Végétal, géométrique ou abstrait — le mur comme tableau décoratif",                     img:[ppm1,ppm2,ppm3,ppm4,ppm5] },
      { id:"ma_beton",    label:"Béton Ciré Effet Matière",       desc:"Enduit effet béton ou stuc marbre — modernité industrielle ou raffinée",               img:[bcem,bcem1,bcem2,bcem3] },
    ]
  },
  textiles: {
    id:"textiles", icon:"🛋️", label:"Textiles & Matières",
    title:"Les tissus et matières de votre intérieur",
    subtitle:"Le toucher et le regard — les textiles définissent la personnalité de vos pièces",
    options:[
      { id:"tex_lin",     label:"Lin & Coton Naturel",           desc:"Housse lin, coussins coton, tapis jute — matières naturelles et épurées",               img: [lacn,lacn1,lacn2,lacn3] },
      { id:"tex_velours", label:"Velours & Velvet",              desc:"Canapé velours coloré, coussins satinés — opulence tactile et richesse visuelle",        img: [vav,vav1,vav2,vav3] },
      { id:"tex_cuir",    label:"Cuir & Similicuir",             desc:"Canapé cuir ou similicuir, robuste et facile d'entretien — élégance masculine",         img: [cas,cas1,cas2,cas3] },
      { id:"tex_bouclé",  label:"Bouclé & Laine Texturée",       desc:"Fauteuils bouclé, plaids laine — texture visible et douceur maximale",                  img: [balt,balt1,balt2,balt3] },
      { id:"tex_mixte",   label:"Mix Matières Étudiées",         desc:"Marier bois + métal + tissu + cuir — chaque pièce a sa propre identité",                img:[mme,mme1,mme2,mme3,mme4] },
    ]
  },
  luminaires: {
    id:"luminaires", icon:"🕯️", label:"Luminaires",
    title:"Vos luminaires décoratifs",
    subtitle:"Les luminaires sont les bijoux d'un intérieur — ils définissent le style autant qu'ils éclairent",
    options:[
      { id:"lum_lustre",  label:"Grand Lustre Central",           desc:"Pièce maîtresse du plafond — cristal, rotin, métal forgé selon votre style",           img:[glc,glc1,glc2,glc3] },
      { id:"lum_suspension",label:"Suspensions Multiples",        desc:"Série de petites suspensions ou une grappe — composition graphique au-dessus de table", img:[sm1,sm2,sm3] },
      { id:"lum_appliques",label:"Appliques Murales Design",       desc:"Lumière douce latérale, intimité créée — parfait pour chambre et couloir",            img:[amd,amd1,amd2,amd3] },
      { id:"lum_lampes",  label:"Lampes de Sol & Chevet",         desc:"Points de lumière à hauteur d'yeux — convivialité et atmosphère maîtrisée",           img:[ldsac,ldsac1,ldsac2,ldsac3] },
    ]
  },
  vegetal: {
    id:"vegetal", icon:"🌿", label:"Végétal & Nature",
    title:"La nature dans votre intérieur",
    subtitle:"Le végétal apporte vie, air pur et couleur sans aucun travaux",
    options:[
      { id:"veg_minima",  label:"Quelques Plantes Choisies",     desc:"2 ou 3 grandes plantes d'intérieur stratégiquement placées — effet maximal",            img:[qpc,qpc1,qpc2,qpc3] },
      { id:"veg_mur",     label:"Mur Végétal ou Tableau Mousse",  desc:"Composition murale végétale — décoration vivante, zéro entretien pour la mousse",      img:[mvotm,mvotm1,mvotm2,mvotm3] },
      { id:"veg_aucun",   label:"Sans Végétal",                   desc:"Intérieur minéral et structuré — l'ornementation vient uniquement des matières",        img:[sv,sv1,sv2,sv3] },
    ]
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ARCHETYPES per path
// ─────────────────────────────────────────────────────────────────────────────
const ARCHETYPES_BY_PATH = {
  complet: [
    { id:"essentiel",   icon:"🏠", name:"L'Essentiel",         tagline:"Propre, solide, chez soi.",             desc:"Béton, carrelage, toit triangulaire. Tout ce qu'une famille a besoin, rien de superflu.",    palette:"alabaster",  defaults:{ facade:"fac_gable1", sols:"sol_carrelage", structure:"mur_enduit", plafond:"pla_simple",  escalier:"esc_beton",      exterieur:"ext_simple"  } },
    { id:"familial",    icon:"🏡", name:"Familial Moderne",     tagline:"Chaleur, espace, vie.",                 desc:"R+1 avec balcon, parquet dans les chambres, cuisine ouverte, jardin — pour vivre ensemble.", palette:"terracotta", defaults:{ facade:"fac_r1",     sols:"sol_parquet",    structure:"mur_crepi",   plafond:"pla_placo",   escalier:"esc_bois",       exterieur:"ext_terrasse" } },
    { id:"contemporain",icon:"🏢", name:"Contemporain",         tagline:"Lignes nettes, matières nobles.",       desc:"Toit plat ou bac acier, béton ciré, volumes graphiques, escalier flottant.",                  palette:"velvet",     defaults:{ facade:"fac_bungalow",sols:"sol_beton",     structure:"mur_brique",  plafond:"pla_led",     escalier:"esc_flottant",   exterieur:"ext_terrasse" } },
    { id:"prestige",    icon:"🏛️", name:"Prestige",             tagline:"L'architecture comme déclaration.",     desc:"Grande villa, marbre, colonnade, grand escalier, piscine — une résidence qui marque.",          palette:"obsidian",   defaults:{ facade:"fac_prestige",sols:"sol_marbre",    structure:"mur_stuc",    plafond:"pla_double",  escalier:"esc_monumental", exterieur:"ext_piscine"  } },
  ],
  interieur: [
    { id:"cosy",        icon:"🧡", name:"Cosy & Chaleureux",    tagline:"Un foyer qui réconforte.",              desc:"Textiles doux, lumières chaudes, bois naturel — on se sent chez soi dès la porte.",             palette:"terracotta", defaults:{ ambiance_salon:"as_cosy",    cuisine_style:"cs_bois",     chambre_atmo:"ca_doux",    sdb_style:"sb_naturel",  eclairage:"ecl_indirect",  rangement:"rng_encastre" } },
    { id:"contemp_int", icon:"🖤", name:"Contemporain",          tagline:"Design maîtrisé, impact fort.",         desc:"Mobilier bas, contrastes nets, éclairage architectural — chaque choix est assumé.",            palette:"gris",       defaults:{ ambiance_salon:"as_moderne", cuisine_style:"cs_sombre",   chambre_atmo:"ca_contemp", sdb_style:"sb_italienne", eclairage:"ecl_spots",     rangement:"rng_dressing" } },
    { id:"nature",      icon:"🌿", name:"Nature & Organic",      tagline:"La nature comme décorateur.",           desc:"Plantes, pierre, bois, lin — une harmonie végétale qui respire et apaise.",                    palette:"sage",       defaults:{ ambiance_salon:"as_japandi", cuisine_style:"cs_bois",     chambre_atmo:"ca_nordique",sdb_style:"sb_naturel",  eclairage:"ecl_naturel",   rangement:"rng_ouvert"   } },
    { id:"prestige_int",icon:"✨", name:"Prestige Intérieur",    tagline:"Luxe discret, finitions parfaites.",    desc:"Suite hôtel cinq étoiles, marbre, velours, lustre — chaque pièce est une expérience.",           palette:"champagne",  defaults:{ ambiance_salon:"as_luxe",    cuisine_style:"cs_blanche",  chambre_atmo:"ca_suite",   sdb_style:"sb_marbre",   eclairage:"ecl_lustre",    rangement:"rng_encastre"  } },
  ],
  decoration: [
    { id:"soleil",      icon:"☀️", name:"Soleil & Joie",        tagline:"Couleurs vives, bonne humeur.",         desc:"Orangés, jaunes chauds, textiles colorés — une déco qui donne de l'énergie chaque matin.",      palette:"terracotta", defaults:{ mood:"mood_chaud",    mur_accent:"ma_uni",   textiles:"tex_lin",     luminaires:"lum_suspension", vegetal:"veg_minima"  } },
    { id:"zen",         icon:"🌙", name:"Zen & Épuré",           tagline:"Calme, espace, sérénité.",              desc:"Blanc, gris perle, bois clair, peu de choses mais bien choisies — le vide comme luxe.",         palette:"alabaster",  defaults:{ mood:"mood_frais",   mur_accent:"ma_beton", textiles:"tex_bouclé", luminaires:"lum_appliques",  vegetal:"veg_minima"  } },
    { id:"bold",        icon:"🖤", name:"Bold & Dramatique",     tagline:"Oser les contrastes, marquer les esprits.",desc:"Murs sombres, velours, or — une déco courageuse pour ceux qui savent ce qu'ils veulent.",   palette:"obsidian",   defaults:{ mood:"mood_dramatique",mur_accent:"ma_brique",textiles:"tex_velours",luminaires:"lum_lustre",     vegetal:"veg_aucun"   } },
    { id:"nature_deco", icon:"🌱", name:"Nature & Vivant",       tagline:"Le vert comme couleur principale.",     desc:"Plantes partout, textiles naturels, bois brut — l'intérieur comme une forêt habitée.",            palette:"sage",       defaults:{ mood:"mood_naturel", mur_accent:"ma_lambris",textiles:"tex_lin",   luminaires:"lum_lampes",     vegetal:"veg_mur"     } },
  ],
};

const PATH_SECTIONS = {
  complet:    ["facade","sols","structure","plafond","escalier","exterieur"],
  interieur:  ["ambiance_salon","cuisine_style","chambre_atmo","sdb_style","eclairage","rangement"],
  decoration: ["mood","mur_accent","textiles","luminaires","vegetal"],
};

const ALL_SECTIONS = { ...SECTIONS_COMPLET, ...SECTIONS_INTERIEUR, ...SECTIONS_DECO };

const BTP_TYPES = [
  "Routes & Voirie","Bâtiment Administratif","École / Université",
  "Hôpital / Clinique","Immeuble Commercial","Pont / Ouvrage d'Art",
  "Aménagement Urbain","Logements Sociaux","Autre"
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  .nv-card{cursor:pointer;border-radius:8px;overflow:hidden;position:relative;transition:all 0.28s cubic-bezier(0.16,1,0.3,1);border:1.5px solid var(--border);background:#FFFFFF;box-shadow:0 4px 16px var(--shadow);}
  .nv-card:hover{transform:translateY(-5px);box-shadow:0 16px 36px var(--shadow-hover);border-color:var(--accent-gold);}
  .nv-card.nv-sel{border-color:var(--accent);box-shadow:0 0 0 3px rgba(15,44,89,0.12),0 12px 32px var(--shadow-hover);transform:translateY(-5px);}
  .nv-card.nv-sel::after{content:'✓';position:absolute;top:10px;right:10px;background:var(--accent);color:#FFF;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;font-family:var(--font-sans);z-index:5;}
  .nv-img{transition:transform 0.5s ease;width:100%;height:100%;object-fit:cover;}
  .nv-card:hover .nv-img{transform:scale(1.06);}
  .nv-pill{background:transparent;border:1px solid var(--border);color:var(--text-body);padding:7px 15px;border-radius:4px;font-family:var(--font-sans);font-size:0.72rem;cursor:pointer;white-space:nowrap;transition:all 0.18s;letter-spacing:0.03em;}
  .nv-pill:hover{border-color:var(--accent-gold);color:var(--text-title);}
  .nv-pill.nv-active{background:var(--accent);border-color:var(--accent);color:#FFF;font-weight:500;}
  .nv-pill.nv-done{border-color:var(--accent-gold);color:var(--accent-gold);}
  .nv-field{width:100%;background:#FFFFFF;border:1px solid var(--border);color:var(--text-title);padding:11px 13px;font-family:var(--font-sans);font-size:0.88rem;border-radius:4px;outline:none;transition:border-color 0.2s;font-weight:300;}
  .nv-field:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(15,44,89,0.06);}
  .nv-field::placeholder{color:#94A3B8;}
  .nv-label{display:block;font-family:var(--font-sans);font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-body);margin-bottom:7px;font-weight:500;}
  .nv-fade{animation:nvFade 0.32s cubic-bezier(0.16,1,0.3,1);}
  @keyframes nvFade{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  .nv-chip{display:inline-flex;align-items:center;cursor:pointer;padding:9px 16px;border-radius:6px;border:1.5px solid var(--border);font-family:var(--font-sans);font-size:0.8rem;transition:all 0.18s;background:#FFF;color:var(--text-body);}
  .nv-chip:hover{border-color:var(--accent-gold);color:var(--text-title);}
  .nv-chip.nv-chip-sel{background:var(--accent);border-color:var(--accent);color:#FFF;}
  .nv-path-card{cursor:pointer;border-radius:10px;padding:28px 24px;border:1.5px solid var(--border);background:#FFF;box-shadow:0 4px 16px var(--shadow);transition:all 0.26s cubic-bezier(0.16,1,0.3,1);}
  .nv-path-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px var(--shadow-hover);border-color:var(--accent-gold);}
  .nv-arch-card{cursor:pointer;border-radius:10px;padding:22px 18px;border:1.5px solid var(--border);background:#FFF;box-shadow:0 4px 16px var(--shadow);transition:all 0.26s cubic-bezier(0.16,1,0.3,1);}
  .nv-arch-card:hover{transform:translateY(-4px);box-shadow:0 14px 36px var(--shadow-hover);border-color:var(--accent-gold);}
  .nv-arch-card.nv-arch-sel{border-color:var(--accent);background:var(--bg-secondary);box-shadow:0 0 0 3px rgba(15,44,89,0.1);}
  .nv-pal-card{cursor:pointer;border-radius:8px;border:1.5px solid var(--border);padding:14px;background:#FFF;display:flex;align-items:center;gap:14px;transition:all 0.22s;box-shadow:0 2px 8px var(--shadow);}
  .nv-pal-card:hover{border-color:var(--accent-gold);transform:translateY(-2px);box-shadow:0 8px 22px var(--shadow-hover);}
  .nv-pal-card.nv-pal-sel{border-color:var(--accent);background:var(--bg-secondary);box-shadow:0 0 0 3px rgba(15,44,89,0.08);}
  .nv-reassure{background:linear-gradient(135deg,#0F2C59 0%,#1a3d7a 100%);color:#fff;border-radius:10px;padding:24px 28px;margin-bottom:36px;}
  .nv-back-btn{background:none;border:none;cursor:pointer;font-family:var(--font-sans);font-size:0.8rem;color:var(--text-body);padding:0;margin-bottom:26px;}
  .nv-back-btn:hover{color:var(--text-title);}
  .nv-hero-img { transition: opacity 0.4s ease-in-out; }
  .nv-skip-btn { background: none; border: 1px dashed var(--border); color: var(--text-body); padding: 6px 16px; border-radius: 4px; cursor: pointer; font-family: var(--font-sans); font-size: 0.8rem; margin-left: 12px; }
  .nv-skip-btn:hover { border-color: var(--accent-gold); color: var(--text-title); }
`;

// ─────────────────────────────────────────────────────────────────────────────
// PATH META (labels, icons, intro copy per path)
// ─────────────────────────────────────────────────────────────────────────────
const PATH_META = {
  complet: {
    archTitle:   "Quel type de construction vous correspond ?",
    archSub:     "Choisissez un point de départ ci-dessous. Cela va pré-remplir toutes les sections (façade, sols, murs, plafond...) avec des choix cohérents. Vous pourrez ensuite modifier chaque choix individuellement si vous le souhaitez.",
    heroLabel:   "Construction & Rénovation",
    sectionIntro:"Chaque choix que vous faites ici est un élément structurel réel. Nos équipes BTP s'occupent de l'exécution.",
  },
  interieur: {
    archTitle:   "Quelle identité pour votre intérieur ?",
    archSub:     "Choisissez un point de départ ci-dessous. Cela va pré-remplir toutes les sections (ambiances, cuisine, chambres...) avec des choix cohérents. Vous pourrez ensuite modifier chaque choix individuellement si vous le souhaitez.",
    heroLabel:   "Aménagement Intérieur",
    sectionIntro:"Vous n'avez pas besoin de casser un mur pour transformer une maison. Choisissez votre univers.",
  },
  decoration: {
    archTitle:   "Quelle énergie pour votre chez-vous ?",
    archSub:     "Choisissez un point de départ ci-dessous. Cela va pré-remplir toutes les sections (couleurs, matières, lumières...) avec des choix cohérents. Vous pourrez ensuite modifier chaque choix individuellement si vous le souhaitez.",
    heroLabel:   "Décoration & Couleurs",
    sectionIntro:"Les grands changements commencent parfois par une couleur, un tissu, une plante. Osez.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function SlideshowImg({ imgs, style, onError }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    if (!imgs || imgs.length <= 1) return;
    const interval = setInterval(() => {
      if (paused.current) return;
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % imgs.length);
        setFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [imgs]);

  if (!imgs || imgs.length === 0) return null;

  return (
    <img
      src={imgs[idx]}
      alt=""
      style={{
        ...style,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onError={onError}
    />
  );
}

export default function NelwanVisualizer({ onApplyDossier }) {
  const [screen, setScreen]           = useState("landing");
  const [journeyPath, setJourneyPath] = useState(null);
  const [archetype, setArchetype]     = useState(null);
  const [selections, setSelections]   = useState({});
  const [palette, setPalette]         = useState(null);
  const [sectionIdx, setSectionIdx]   = useState(0);
  const [hoveredOpt, setHoveredOpt]   = useState(0); // Changed to index, default to 0
  const [animKey, setAnimKey]         = useState(0);

  const [form, setForm] = useState({ name:"", phone:"", email:"", quartier:"", message:"" });
  const [btpForm, setBtpForm] = useState({ types:[], location:"", maitreOuvrage:"", delai:"", description:"", name:"", phone:"", email:"" });

  const bump = () => setAnimKey(k => k + 1);
  const go   = (s) => { bump(); setScreen(s); window.scrollTo({ top:0, behavior:"smooth" }); };

  // ── derived ──────────────────────────────────────────────────────────────
  const sectionIds       = journeyPath && journeyPath !== "btp" ? PATH_SECTIONS[journeyPath] : [];
  const totalSections    = sectionIds.length;
  const currentSectionId = sectionIds[sectionIdx];
  const currentSection   = currentSectionId ? ALL_SECTIONS[currentSectionId] : null;
  const palObj           = palette ? COLOR_PALETTES[palette] : null;
  const archetypes       = journeyPath && journeyPath !== "btp" ? ARCHETYPES_BY_PATH[journeyPath] : [];
  const archObj          = archetype ? archetypes.find(a => a.id === archetype) : null;
  const pathMeta         = journeyPath && journeyPath !== "btp" ? PATH_META[journeyPath] : null;

  const progressPct = screen === "sections"
    ? Math.round((sectionIdx / (totalSections + 1)) * 100)
    : screen === "palette" ? Math.round((totalSections / (totalSections + 1)) * 100)
    : ["visionboard","contact"].includes(screen) ? 100 : 0;

  const getSectionOptions = (secId) => {
    const sec = ALL_SECTIONS[secId];
    if (!sec) return [];
    return [
      ...sec.options,
      {
        id: `${secId}_none`,
        label: "Je ne sélectionne rien (À discuter)",
        desc: "Je souhaite un mélange de styles ou une autre option que je décrirai à l'architecte plus tard.",
        img: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"]
      }
    ];
  };

  const currentSectionOptions = getSectionOptions(currentSectionId);
  const selectedOpt  = currentSection ? currentSectionOptions.find(o => o.id === selections[currentSectionId]) || null : null;
  
  // The preview image now changes based on the hovered option index.
  const previewImg = currentSectionOptions[hoveredOpt]?.img?.[0];

  // Reset hover state when section changes
  useEffect(() => {
    setHoveredOpt(0);
  }, [currentSectionId]);

  // ── archetype pick ───────────────────────────────────────────────────────
  const chooseArchetype = (archId) => {
    const a = archetypes.find(x => x.id === archId);
    setArchetype(archId);
    setSelections(a.defaults);
    setPalette(a.palette);
    setSectionIdx(0);
    bump();
    go("sections");
  };

  // ── skip section ───────────────────────────────────────────────────────
  const skipSection = () => {
    setSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[currentSectionId];
      return newSelections;
    });
    if (sectionIdx < totalSections - 1) {
      setSectionIdx(i => i + 1);
    } else {
      go("palette");
    }
  };

  // ── submit ───────────────────────────────────────────────────────────────
  const submitResidential = () => {
    const lines = sectionIds.map(id => {
      const sec = ALL_SECTIONS[id];
      const opt = getSectionOptions(id).find(o => o.id === selections[id]);
      return opt ? `• ${sec.label}: ${opt.label}` : `• ${sec.label}: Non précisé`;
    });
    const pathLabel = { complet:"Construction / Rénovation Complète", interieur:"Aménagement Intérieur", decoration:"Décoration & Couleurs" }[journeyPath];
    const text = `Bonjour NELWAN SARL 👋\n\nDossier de Vision — ${pathLabel}\n\n🏠 Style de base: ${archObj ? archObj.name : "Personnalisé"}\n🎨 Palette: ${palObj ? palObj.name + " · " + palObj.finish : "Non choisie"}\n\n📋 Mes choix:\n${lines.join("\n")}\n\n📍 Localisation: ${form.quartier || "À préciser"}\n💬 ${form.message || "—"}\n\n👤 ${form.name} · 📞 ${form.phone}${form.email ? " · 📧 " + form.email : ""}`;
    window.open(`https://wa.me/243819929338?text=${encodeURIComponent(text)}`, "_blank");
    if (onApplyDossier) onApplyDossier({ design_persona: archObj?.name || "Personnalisé", material_choice: palObj?.name || "—" });
    go("done");
  };

  const submitBtp = () => {
    const text = `Bonjour NELWAN SARL 👋\n\nDemande BTP / Infrastructure\n\n🏗️ Type(s): ${btpForm.types.join(", ") || "—"}\n📍 Localisation: ${btpForm.location || "—"}\n🏢 Maître d'ouvrage: ${btpForm.maitreOuvrage || "—"}\n⏱️ Délai: ${btpForm.delai || "—"}\n\n📝 Description:\n${btpForm.description || "—"}\n\n👤 ${btpForm.name} · 📞 ${btpForm.phone}${btpForm.email ? " · 📧 " + btpForm.email : ""}`;
    window.open(`https://wa.me/243819929338?text=${encodeURIComponent(text)}`, "_blank");
    go("done");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ width:"100%", background:"var(--bg-primary)", minHeight:"60vh" }}>
      <style>{CSS}</style>

      {/* Progress */}
      {["sections","palette","visionboard","contact"].includes(screen) && (
        <div style={{ height:"3px", background:"var(--border)" }}>
          <div style={{ height:"100%", width:`${progressPct}%`, background:"var(--accent-gold)", transition:"width 0.5s ease" }} />
        </div>
      )}

      <div key={animKey} className="nv-fade">

        {/* ════════════════════════════════════════════════════════════
            LANDING
        ════════════════════════════════════════════════════════════ */}
        {screen === "landing" && (
          <div style={{ textAlign:"center", padding:"80px 6% 60px" }}>
            <p className="section-subtitle">Le Visualiseur NELWAN</p>
            <h2 className="section-title" style={{ fontSize:"clamp(2.2rem,5vw,3.6rem)", marginBottom:"18px" }}>
              Ici, vous rêvez.<br />
              <span style={{ fontStyle:"italic", color:"var(--accent-gold)" }}>Nous, on construit.</span>
            </h2>
            <p style={{ maxWidth:"560px", margin:"0 auto 16px", color:"var(--text-body)", fontWeight:300, fontSize:"1rem", lineHeight:1.8 }}>
              Choisissez ce qui vous inspire — sans limites. Nos équipes s'occupent du reste.
            </p>
            <div style={{ display:"inline-block", background:"#FEF9E7", border:"1px solid var(--accent-gold)", borderRadius:"8px", padding:"14px 22px", marginBottom:"50px", maxWidth:"580px" }}>
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.85rem", color:"#7d5a00", lineHeight:1.6, fontStyle:"italic" }}>
                ✨ Ce que vous voyez peut sembler hors de portée — vous seriez surpris de ce que NELWAN SARL peut accomplir à Kinshasa. Le luxe est plus atteignable que vous ne le pensez.
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"20px", maxWidth:"1020px", margin:"0 auto" }}>
              {[
                { id:"complet",    icon:"🏗️", title:"Construire ou Rénover",   sub:"Je pars de zéro ou je refais tout — façade, sols, murs, plafond, escalier, extérieurs.",   color:"#EFF6FF" },
                { id:"interieur",  icon:"🛋️", title:"Aménager l'Intérieur",    sub:"J'ai mes murs. Je veux transformer l'atmosphère — ambiances, meubles, lumières, rangements.", color:"#FFF7ED" },
                { id:"decoration", icon:"🎨", title:"Décoration & Couleurs",    sub:"Je veux rafraîchir ma déco — couleurs, mur accent, textiles, luminaires, végétal.",          color:"#F0FDF4" },
                { id:"btp",        icon:"🏙️", title:"BTP & Infrastructure",     sub:"Projet commercial, institutionnel ou d'infrastructure publique — routes, bâtiments, ponts.", color:"#F8FAFC" },
              ].map(p => (
                <div key={p.id} className="nv-path-card" style={{ background: p.color }}
                  onClick={() => { 
                    setJourneyPath(p.id); 
                    bump(); 
                    if (p.id === "btp") {
                      go("btp");
                    } else {
                      // Instead of go("archetype"), go directly to sections
                      setSelections({}); // Empty selections - user chooses everything
                      setPalette(null);
                      setArchetype(null);
                      setSectionIdx(0);
                      go("sections");
                    }
                  }}
                >
                  <div style={{ fontSize:"2.2rem", marginBottom:"14px" }}>{p.icon}</div>
                  <h3 style={{ fontFamily:"var(--font-serif)", fontSize:"1.3rem", fontWeight:400, color:"var(--text-title)", marginBottom:"8px" }}>{p.title}</h3>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.82rem", color:"var(--text-body)", lineHeight:1.6, fontWeight:300 }}>{p.sub}</p>
                  <div style={{ marginTop:"18px", fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:"var(--accent)", fontWeight:500, letterSpacing:"0.06em" }}>Commencer →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            ARCHETYPE
        ════════════════════════════════════════════════════════════ */}
        {screen === "archetype" && pathMeta && (
          <section style={{ padding:"65px 6%", background:"var(--bg-secondary)" }}>
            <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
              <button className="nv-back-btn" onClick={() => go("landing")}>← Retour</button>
              {/* REMOVED "Point de Départ" subtitle and updated subtitle to be the tutorial */}
              <p className="section-subtitle" style={{ color: "var(--accent-gold)", fontWeight: 500, letterSpacing: "0.08em" }}>Guide de Démarrage</p>
              <h2 className="section-title" style={{ marginBottom:"10px" }}>{pathMeta.archTitle}</h2>
              <p style={{ color:"var(--text-body)", fontWeight:300, maxWidth:"560px", marginBottom:"40px", lineHeight:1.7, fontStyle: "italic", background: "#f8f9fa", padding: "12px 16px", borderRadius: "6px", borderLeft: "3px solid var(--accent-gold)" }}>
                {pathMeta.archSub}
              </p>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(215px,1fr))", gap:"16px", marginBottom:"36px" }}>
                {archetypes.map(a => {
                  const isSel = archetype === a.id;
                  const pal   = COLOR_PALETTES[a.palette];
                  return (
                    <div key={a.id} className={`nv-arch-card ${isSel ? "nv-arch-sel" : ""}`} onClick={() => setArchetype(a.id)}>
                      <div style={{ fontSize:"1.9rem", marginBottom:"12px" }}>{a.icon}</div>
                      <h3 style={{ fontFamily:"var(--font-serif)", fontSize:"1.15rem", fontWeight:400, color: isSel ? "var(--accent)" : "var(--text-title)", marginBottom:"5px" }}>{a.name}</h3>
                      <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.77rem", fontWeight:500, color:"var(--accent-gold)", marginBottom:"8px", fontStyle:"italic" }}>{a.tagline}</p>
                      <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.79rem", color:"var(--text-body)", lineHeight:1.55, fontWeight:300 }}>{a.desc}</p>
                      <div style={{ marginTop:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
                        <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:pal.hex, border:`2px solid ${pal.accent}` }} />
                        <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.68rem", color:"var(--text-body)" }}>{pal.name}</span>
                      </div>
                      {isSel && <div style={{ marginTop:"8px", fontFamily:"var(--font-sans)", fontSize:"0.72rem", color:"var(--accent)", fontWeight:600 }}>✓ Sélectionné</div>}
                    </div>
                  );
                })}
              </div>

              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button className="btn-primary" style={{ padding:"13px 30px", fontSize:"0.85rem", opacity: archetype ? 1 : 0.45 }}
                  disabled={!archetype} onClick={() => chooseArchetype(archetype)}>
                  Personnaliser ma vision →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════
            SECTIONS
        ════════════════════════════════════════════════════════════ */}
        {screen === "sections" && currentSection && (
          <div>
            {/* Step pills */}
            <div style={{ background:"var(--bg-secondary)", borderBottom:"1px solid var(--border)", padding:"0 4%", overflowX:"auto" }}>
              <div style={{ maxWidth:"1300px", margin:"0 auto", display:"flex", alignItems:"center", height:"52px", gap:"6px" }}>
                {sectionIds.map((id, i) => {
                  const sec  = ALL_SECTIONS[id];
                  const done = !!selections[id];
                  const active = i === sectionIdx;
                  return (
                    <button key={id} className={`nv-pill ${active ? "nv-active" : done ? "nv-done" : ""}`}
                      onClick={() => { bump(); setSectionIdx(i); }}>
                      {sec.icon} {sec.label}{done && !active ? " ✓" : ""}
                    </button>
                  );
                })}
                <button className="nv-pill" style={{ marginLeft:"4px", borderStyle:"dashed" }} onClick={() => go("palette")}>
                  🎨 Palette
                </button>
              </div>
            </div>

            {/* Hero */}
            <div style={{ position:"relative", height:"370px", overflow:"hidden", background:"var(--bg-tertiary)" }}>
              {previewImg && (
                <img key={previewImg} src={previewImg} alt=""
                  className="nv-hero-img"
                  style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.55)" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
              )}
              {palObj && <div style={{ position:"absolute", inset:0, background:palObj.wall, opacity:0.2, mixBlendMode:"multiply", pointerEvents:"none" }} />}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 55%)", display:"flex", alignItems:"flex-end", padding:"36px 6%" }}>
                <div>
                  <p className="section-subtitle" style={{ marginBottom:"8px" }}>
                    {sectionIdx + 1} / {totalSections} · {pathMeta?.heroLabel}
                  </p>
                  <h2 style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:300, color:"#FFF", lineHeight:1.1, marginBottom:"5px" }}>
                    {currentSection.title}
                  </h2>
                  <p style={{ fontFamily:"var(--font-sans)", fontWeight:300, fontSize:"0.88rem", color:"rgba(255,255,255,0.7)" }}>
                    {currentSection.subtitle}
                  </p>
                </div>
              </div>
              {selectedOpt && (
                <div style={{ position:"absolute", top:"22px", right:"6%", background:"rgba(255,255,255,0.95)", borderRadius:"4px", padding:"7px 15px", fontFamily:"var(--font-sans)", fontSize:"0.73rem", color:"var(--accent)", fontWeight:500, border:"1px solid var(--border)" }}>
                  ✓ {selectedOpt.label}
                </div>
              )}
              {palObj && (
                <div style={{ position:"absolute", top:"22px", left:"6%", background:"rgba(255,255,255,0.93)", borderRadius:"4px", padding:"6px 13px", display:"flex", alignItems:"center", gap:"7px", fontFamily:"var(--font-sans)", fontSize:"0.71rem", color:"var(--text-title)", border:"1px solid var(--border)" }}>
                  <div style={{ width:"11px", height:"11px", borderRadius:"50%", background:palObj.hex, border:`1.5px solid ${palObj.accent}` }} />
                  {palObj.name}
                </div>
              )}
            </div>

            {/* Options */}
            <section style={{ background:"var(--bg-primary)", padding:"36px 6% 52px" }}>
              <div style={{ maxWidth:"1300px", margin:"0 auto" }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:"16px", marginBottom:"36px" }}>
                  {currentSectionOptions.map((opt, i) => {
                    const isSel = selections[currentSectionId] === opt.id;
                    return (
                      <div key={opt.id} className={`nv-card ${isSel ? "nv-sel" : ""}`}
                        onClick={() => setSelections(prev => ({ ...prev, [currentSectionId]: opt.id }))}
                        onMouseEnter={() => setHoveredOpt(i)}
                        onMouseLeave={() => setHoveredOpt(0)} // Reset to first option if not hovering a specific one
                      >
                        <div style={{ height:"155px", overflow:"hidden", position:"relative", background:"var(--bg-tertiary)" }}>
                          <SlideshowImg
                            imgs={opt.img}
                            style={{ width:"100%", height:"100%", objectFit:"cover" }}
                            onError={e => { e.target.parentNode.style.background="var(--bg-tertiary)"; e.target.style.display="none"; }}
                          />
                          {palObj && <div style={{ position:"absolute", inset:0, background:palObj.wall, opacity:0.18, mixBlendMode:"multiply", pointerEvents:"none" }} />}
                        </div>
                        <div style={{ padding:"12px 14px" }}>
                          <h4 style={{ fontFamily:"var(--font-serif)", fontSize:"0.95rem", color: isSel ? "var(--accent)" : "var(--text-title)", fontWeight:400, lineHeight:1.2, marginBottom:"4px" }}>
                            {opt.label}
                          </h4>
                          {opt.desc && (
                            <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.72rem", color:"var(--text-body)", lineHeight:1.4, fontWeight:300 }}>
                              {opt.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <button className="btn-secondary" style={{ visibility: sectionIdx > 0 ? "visible" : "hidden", padding:"11px 22px", fontSize:"0.8rem" }}
                    onClick={() => { bump(); setSectionIdx(i => i - 1); }}>
                    ← Retour
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <button className="nv-skip-btn" onClick={skipSection}>
                      Passer cette section →
                    </button>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.75rem", color:"var(--text-body)" }}>
                      {selections[currentSectionId] ? "Choix enregistré ✓" : "Choisissez ou passez à la suite"}
                    </span>
                  </div>
                  <button className="btn-primary" style={{ padding:"11px 26px", fontSize:"0.8rem" }}
                    onClick={() => { bump(); if (sectionIdx < totalSections - 1) { setSectionIdx(i => i + 1); } else { go("palette"); } }}>
                    {sectionIdx < totalSections - 1 ? "Section Suivante →" : "Choisir la Palette →"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            PALETTE
        ════════════════════════════════════════════════════════════ */}
        {screen === "palette" && (
          <section style={{ padding:"65px 6%", background:"var(--bg-primary)" }}>
            <div style={{ maxWidth:"980px", margin:"0 auto" }}>
              <button className="nv-back-btn" onClick={() => { bump(); go("sections"); setSectionIdx(totalSections - 1); }}>
                ← Retour aux sections
              </button>
              <p className="section-subtitle">Ambiance Chromatique</p>
              <h2 className="section-title" style={{ marginBottom:"10px" }}>Choisissez vos couleurs</h2>
              <p style={{ maxWidth:"540px", color:"var(--text-body)", fontWeight:300, lineHeight:1.7, marginBottom:"36px" }}>
                La couleur et la finition définissent l'âme de votre espace — murs, encadrements et détails seront déclinés dans cette ambiance.
              </p>

              {palette && palObj && (
                <div style={{ display:"flex", gap:"12px", marginBottom:"36px" }}>
                  <div style={{ flex:1, background:palObj.wall, borderRadius:"8px", height:"72px", display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid var(--border)" }}>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", color: palObj.hex === "#F8F8F8" ? "#333" : "#fff", letterSpacing:"0.1em", textTransform:"uppercase" }}>Murs · {palObj.finish}</span>
                  </div>
                  <div style={{ flex:1, background:palObj.accent, borderRadius:"8px", height:"72px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase" }}>Accents & Encadrements</span>
                  </div>
                </div>
              )}

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"11px", marginBottom:"46px" }}>
                {Object.entries(COLOR_PALETTES).map(([key, pal]) => {
                  const isSel = palette === key;
                  return (
                    <div key={key} className={`nv-pal-card ${isSel ? "nv-pal-sel" : ""}`} onClick={() => setPalette(key)}>
                      <div style={{ display:"flex", gap:"5px", flexShrink:0 }}>
                        <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:pal.wall, border:`2px solid ${pal.accent}` }} />
                        <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:pal.accent, border:`2px solid ${pal.wall === "#F8F8F8" ? "#ddd" : pal.wall}` }} />
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:"var(--font-serif)", fontSize:"0.98rem", fontWeight:400, color: isSel ? "var(--accent)" : "var(--text-title)", marginBottom:"2px" }}>{pal.name}</div>
                        <div style={{ fontFamily:"var(--font-sans)", fontSize:"0.69rem", color:"var(--text-body)" }}>{pal.label} · {pal.finish}</div>
                      </div>
                      {isSel && <span style={{ color:"var(--accent)", fontWeight:700, fontSize:"0.9rem" }}>✓</span>}
                    </div>
                  );
                })}
              </div>

              {/* Preview strip */}
              <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-body)", marginBottom:"13px", fontWeight:500 }}>
                Aperçu de vos sélections {palObj ? `— ${palObj.name}` : ""}
              </p>
              <div style={{ display:"flex", gap:"10px", overflowX:"auto", paddingBottom:"10px", marginBottom:"40px" }}>
                {sectionIds.map(id => {
                  const sec = ALL_SECTIONS[id];
                  const opt = sec.options.find(o => o.id === selections[id]) || sec.options[0];
                  return (
                    <div key={id} className="glass-panel" style={{ flexShrink:0, width:"145px", borderRadius:"6px", overflow:"hidden" }}>
                      <div style={{ height:"90px", position:"relative" }}>
                        <img src={opt.imgs?.[0]} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.72)" }} onError={e => e.target.style.display="none"} />
                        {palObj && <div style={{ position:"absolute", inset:0, background:palObj.wall, opacity:0.28, mixBlendMode:"multiply" }} />}
                      </div>
                      <div style={{ padding:"7px 10px" }}>
                        <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.63rem", color:"var(--text-body)" }}>{sec.icon} {sec.label}</p>
                        <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.71rem", color: selections[id] ? "var(--accent)" : "var(--text-body)", fontWeight:500, lineHeight:1.2, marginTop:"2px" }}>{opt.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button className="btn-primary" style={{ padding:"13px 30px", fontSize:"0.85rem" }} onClick={() => go("visionboard")}>
                  Voir ma Vision →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════
            VISION BOARD
        ════════════════════════════════════════════════════════════ */}
        {screen === "visionboard" && (
          <section style={{ padding:"65px 6%", background:"var(--bg-secondary)" }}>
            <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:"44px" }}>
                <p className="section-subtitle">Votre Vision est Prête</p>
                <h2 className="section-title" style={{ fontSize:"clamp(2rem,4.5vw,3rem)", marginBottom:"14px" }}>
                  {archObj ? archObj.name : "Votre Projet Sur-Mesure"}
                </h2>
                <p style={{ maxWidth:"540px", margin:"0 auto", color:"var(--text-body)", fontWeight:300, fontSize:"0.95rem", lineHeight:1.8 }}>
                  Les images sont une source d'inspiration. Nos architectes vont adapter chaque détail à ce qui est disponible à Kinshasa, à votre portée réelle.
                </p>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:"11px", marginBottom:"30px" }}>
                {sectionIds.map(id => {
                  const sec = ALL_SECTIONS[id];
                  const opt = sec.options.find(o => o.id === selections[id]) || sec.options[0];
                  return (
                    <div key={id} style={{ borderRadius:"8px", overflow:"hidden", boxShadow:"0 4px 16px var(--shadow)" }}>
                      <div style={{ height:"125px", position:"relative" }}>
                        <SlideshowImg
                          imgs={opt.img}
                          style={{ width:"100%", height:"100%", objectFit:"cover" }}
                          onError={e => { e.target.parentNode.style.background="var(--bg-tertiary)"; e.target.style.display="none"; }}
                        />
                        {palObj && <div style={{ position:"absolute", inset:0, background:palObj.wall, opacity:0.3, mixBlendMode:"multiply" }} />}
                        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"7px 10px", background:"linear-gradient(to top, rgba(0,0,0,0.72), transparent)" }}>
                          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", color:"rgba(255,255,255,0.8)" }}>{sec.icon} {sec.label}</p>
                          <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.74rem", color:"#fff", fontWeight:500 }}>{opt.label}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {palObj && (
                  <div style={{ borderRadius:"8px", overflow:"hidden", boxShadow:"0 4px 16px var(--shadow)" }}>
                    <div style={{ height:"125px", background:`linear-gradient(135deg,${palObj.wall} 50%,${palObj.accent} 50%)`, display:"flex", alignItems:"flex-end", padding:"10px" }}>
                      <div>
                        <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.62rem", color: palObj.hex === "#F8F8F8" ? "#333" : "rgba(255,255,255,0.8)" }}>🎨 Palette</p>
                        <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.74rem", fontWeight:500, color: palObj.hex === "#F8F8F8" ? "#333" : "#fff" }}>{palObj.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="nv-reassure" style={{ textAlign:"center", marginBottom:"32px" }}>
                <p style={{ fontFamily:"var(--font-serif)", fontSize:"1.2rem", fontWeight:300, marginBottom:"8px", fontStyle:"italic" }}>
                  "Il est temps de faire du rêve une réalité."
                </p>
                <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.84rem", color:"rgba(255,255,255,0.8)", fontWeight:300, lineHeight:1.7 }}>
                  Nos architectes vont étudier votre dossier, effectuer le relevé de votre site et vous proposer comment concrétiser cette vision — avec les matériaux disponibles à Kinshasa, dans votre fourchette.
                </p>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <button className="btn-secondary" style={{ padding:"11px 22px", fontSize:"0.8rem" }} onClick={() => go("palette")}>← Ajuster</button>
                <button className="btn-primary" style={{ padding:"13px 32px", fontSize:"0.9rem" }} onClick={() => go("contact")}>
                  Soumettre mon Dossier →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════════════════════════ */}
        {screen === "contact" && (
          <section style={{ padding:"65px 6%", background:"var(--bg-primary)" }}>
            <div style={{ maxWidth:"600px", margin:"0 auto" }}>
              <p className="section-subtitle">Dernière Étape</p>
              <h2 className="section-title" style={{ fontSize:"2.4rem", marginBottom:"10px" }}>Vos coordonnées</h2>
              <p style={{ color:"var(--text-body)", fontWeight:300, lineHeight:1.7, marginBottom:"36px" }}>
                Laissez-nous vos informations. Nous vous contactons dans les <strong>24 heures</strong> pour démarrer votre projet et faire du rêve une réalité concrète.
              </p>
              <div className="glass-panel" style={{ padding:"34px", borderRadius:"8px" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                    <div>
                      <label className="nv-label">Nom complet *</label>
                      <input className="nv-field" placeholder="Votre nom" value={form.name} onChange={e => setForm(f => ({...f,name:e.target.value}))} />
                    </div>
                    <div>
                      <label className="nv-label">Téléphone *</label>
                      <input className="nv-field" placeholder="+(243) 8XX XXX XXX" value={form.phone} onChange={e => setForm(f => ({...f,phone:e.target.value}))} />
                    </div>
                  </div>
                  <div>
                    <label className="nv-label">Email</label>
                    <input className="nv-field" type="email" placeholder="votre@email.com" value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))} />
                  </div>
                  <div>
                    <label className="nv-label">Quartier / Localisation du projet</label>
                    <input className="nv-field" placeholder="Ex: Gombe, Ngaliema, Limete..." value={form.quartier} onChange={e => setForm(f => ({...f,quartier:e.target.value}))} />
                  </div>
                  <div>
                    <label className="nv-label">Message (optionnel)</label>
                    <textarea className="nv-field" rows={3} placeholder="Superficie du terrain, délais, précisions..." value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} style={{ resize:"vertical" }} />
                  </div>
                  <button className="btn-primary"
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", padding:"16px", fontSize:"0.9rem", opacity:(!form.name||!form.phone) ? 0.45 : 1 }}
                    onClick={submitResidential} disabled={!form.name||!form.phone}>
                    📲 Envoyer mon Dossier de Vision
                  </button>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", color:"var(--text-body)", textAlign:"center", lineHeight:1.6 }}>
                    Votre dossier complet est envoyé à nos architectes · Consultation gratuite & confidentielle
                  </p>
                </div>
                <div style={{ marginTop:"18px", padding:"15px 18px", background:"#25D366", borderRadius:"6px", display:"flex", alignItems:"center", gap:"13px", cursor:"pointer" }}
                  onClick={() => window.open("https://wa.me/243819929338","_blank")}>
                  <span style={{ fontSize:"1.2rem" }}>💬</span>
                  <div>
                    <p style={{ fontFamily:"var(--font-sans)", fontWeight:500, color:"#fff", fontSize:"0.87rem", marginBottom:"1px" }}>Ou contactez-nous directement</p>
                    <p style={{ fontFamily:"var(--font-sans)", color:"rgba(255,255,255,0.85)", fontSize:"0.76rem" }}>+(243) 819929338 · +(243) 895 411 181</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop:"22px" }}>
                <button className="btn-secondary" style={{ padding:"10px 20px", fontSize:"0.8rem" }} onClick={() => go("visionboard")}>← Retour</button>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════
            BTP
        ════════════════════════════════════════════════════════════ */}
        {screen === "btp" && (
          <section style={{ padding:"65px 6%", background:"var(--bg-primary)" }}>
            <div style={{ maxWidth:"760px", margin:"0 auto" }}>
              <button className="nv-back-btn" onClick={() => go("landing")}>← Retour</button>
              <p className="section-subtitle">BTP & Infrastructure</p>
              <h2 className="section-title" style={{ marginBottom:"10px" }}>Votre projet d'infrastructure</h2>
              <p style={{ color:"var(--text-body)", fontWeight:300, lineHeight:1.7, marginBottom:"40px", maxWidth:"540px" }}>
                Décrivez votre projet. Nos ingénieurs BTP l'analyseront et vous contacteront dans les 48 heures pour discuter faisabilité et prochaines étapes.
              </p>
              <div className="glass-panel" style={{ padding:"36px", borderRadius:"8px" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
                  <div>
                    <label className="nv-label" style={{ marginBottom:"12px" }}>Type(s) de projet *</label>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                      {BTP_TYPES.map(t => {
                        const isSel = btpForm.types.includes(t);
                        return (
                          <span key={t} className={`nv-chip ${isSel ? "nv-chip-sel" : ""}`}
                            onClick={() => setBtpForm(f => ({ ...f, types: isSel ? f.types.filter(x=>x!==t) : [...f.types,t] }))}>
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="nv-label">Maître d'ouvrage</label>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                      {["Privé","ONG / ASBL","Ministère / État","Entreprise","Autre"].map(m => (
                        <span key={m} className={`nv-chip ${btpForm.maitreOuvrage===m ? "nv-chip-sel" : ""}`}
                          onClick={() => setBtpForm(f => ({...f,maitreOuvrage:m}))}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="nv-label">Délai souhaité</label>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                      {["Urgent (< 3 mois)","Court terme (3–12 mois)","Moyen terme (1–3 ans)","À définir"].map(d => (
                        <span key={d} className={`nv-chip ${btpForm.delai===d ? "nv-chip-sel" : ""}`}
                          onClick={() => setBtpForm(f => ({...f,delai:d}))}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="nv-label">Localisation</label>
                    <input className="nv-field" placeholder="Ex: Kinshasa — Gombe, Lubumbashi, Matadi..." value={btpForm.location} onChange={e => setBtpForm(f => ({...f,location:e.target.value}))} />
                  </div>
                  <div>
                    <label className="nv-label">Description du projet *</label>
                    <textarea className="nv-field" rows={5}
                      placeholder="Décrivez votre projet: superficie estimée, capacité, usage prévu, contraintes particulières..."
                      value={btpForm.description} onChange={e => setBtpForm(f => ({...f,description:e.target.value}))} style={{ resize:"vertical" }} />
                  </div>
                  <hr style={{ border:"none", borderTop:"1px solid var(--border)" }} />
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                    <div>
                      <label className="nv-label">Nom / Référent *</label>
                      <input className="nv-field" placeholder="Votre nom" value={btpForm.name} onChange={e => setBtpForm(f => ({...f,name:e.target.value}))} />
                    </div>
                    <div>
                      <label className="nv-label">Téléphone *</label>
                      <input className="nv-field" placeholder="+(243) 8XX XXX XXX" value={btpForm.phone} onChange={e => setBtpForm(f => ({...f,phone:e.target.value}))} />
                    </div>
                  </div>
                  <div>
                    <label className="nv-label">Email professionnel</label>
                    <input className="nv-field" type="email" placeholder="contact@organisation.org" value={btpForm.email} onChange={e => setBtpForm(f => ({...f,email:e.target.value}))} />
                  </div>
                  <button className="btn-primary"
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", padding:"16px", fontSize:"0.9rem", opacity:(!btpForm.name||!btpForm.phone||!btpForm.description) ? 0.45 : 1 }}
                    onClick={submitBtp} disabled={!btpForm.name||!btpForm.phone||!btpForm.description}>
                    📋 Soumettre la Demande BTP
                  </button>
                  <p style={{ fontFamily:"var(--font-sans)", fontSize:"0.7rem", color:"var(--text-body)", textAlign:"center", lineHeight:1.6 }}>
                    Transmis au département BTP de NELWAN SARL · Réponse sous 48h
                  </p>
                </div>
                <div style={{ marginTop:"18px", padding:"15px 18px", background:"#25D366", borderRadius:"6px", display:"flex", alignItems:"center", gap:"13px", cursor:"pointer" }}
                  onClick={() => window.open("https://wa.me/243819929338","_blank")}>
                  <span style={{ fontSize:"1.2rem" }}>💬</span>
                  <div>
                    <p style={{ fontFamily:"var(--font-sans)", fontWeight:500, color:"#fff", fontSize:"0.87rem", marginBottom:"1px" }}>Discussion directe avec nos ingénieurs</p>
                    <p style={{ fontFamily:"var(--font-sans)", color:"rgba(255,255,255,0.85)", fontSize:"0.76rem" }}>+(243) 819929338</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════════════════
            DONE
        ════════════════════════════════════════════════════════════ */}
        {screen === "done" && (
          <section style={{ padding:"90px 6%", background:"var(--bg-secondary)", textAlign:"center" }}>
            <div style={{ maxWidth:"560px", margin:"0 auto" }}>
              <div style={{ fontSize:"3.8rem", marginBottom:"24px" }}>{journeyPath === "btp" ? "🏗️" : "🏛️"}</div>
              <p className="section-subtitle">Dossier Transmis</p>
              <h2 className="section-title" style={{ fontSize:"2.8rem", marginBottom:"16px" }}>
                {journeyPath === "btp" ? "Votre demande BTP est envoyée." : "Votre vision est entre de bonnes mains."}
              </h2>
              <p style={{ color:"var(--text-body)", fontWeight:300, fontSize:"1rem", lineHeight:1.8, marginBottom:"40px" }}>
                {journeyPath === "btp"
                  ? "Un ingénieur NELWAN SARL vous contactera dans les 48 heures pour discuter de la faisabilité et des prochaines étapes."
                  : "Nos architectes vont étudier votre dossier, effectuer le relevé de votre site et vous présenter comment concrétiser ce rêve — avec ce qui est disponible à Kinshasa, à votre portée."}
              </p>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"14px 28px", border:"1px solid var(--accent-gold)", borderRadius:"4px", background:"var(--bg-primary)", marginBottom:"28px" }}>
                <span style={{ fontFamily:"var(--font-sans)", color:"var(--accent-gold)", fontSize:"0.85rem", letterSpacing:"0.06em" }}>NELWAN SARL · +(243) 819929338</span>
              </div>
              <br />
              <button className="btn-secondary" style={{ padding:"12px 24px", fontSize:"0.82rem" }}
                onClick={() => {
                  setScreen("landing"); setJourneyPath(null); setArchetype(null);
                  setSelections({}); setPalette(null); setSectionIdx(0);
                  setForm({ name:"",phone:"",email:"",quartier:"",message:"" });
                  setBtpForm({ types:[],location:"",maitreOuvrage:"",delai:"",description:"",name:"",phone:"",email:"" });
                  bump();
                }}>
                ↩ Commencer un nouveau projet
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}