import React, { useState, useMemo } from "react";


const SRC = {
  ACGME_BLOG:    { label:"ACGME: Resident Leave Policy FAQ (2022)",           url:"https://www.acgme.org/newsroom/blog/2022/acgme-answers-resident-leave-policies/" },
  ABPS_LEAVE:    { label:"ABPS Personal Leave Policy (rev. 2021)",            url:"https://www.abplasticsurgery.org/media/19183/Personal-Leave-Policy-Approved-5-2021.pdf" },
  GODBE_2025:    { label:"Godbe et al., BMC Med Educ 2025 — Unionization & Benefits", url:"https://bmcmededuc.biomedcentral.com/articles/10.1186/s12909-025-07456-5" },
  GATES_2024:    { label:"Gates-Tanzer et al., PRS Glob Open 2024 — Family Planning Goals", url:"https://pubmed.ncbi.nlm.nih.gov/39281088/" },
  KASEMODEL_2022:{ label:"Kasemodel et al. 2022 — Evolution in Parental Leave Policies", url:"https://pubmed.ncbi.nlm.nih.gov/36067473/" },
  ACS_STMT:      { label:"ACS Statement on Parental Leave for Surgical Trainees (2024)", url:"https://www.facs.org/about-acs/statements/revised-statement-on-the-importance-of-workplace-support-for-pregnancy-parental-leave-and-lactation-for-surgical-trainees/" },
  UCSF_PORTAL:   { label:"UCSF Surgery Resident Portal — Family Leave Guidelines", url:"https://surgeryresidentportal.ucsf.edu/guidelines-family-leave-surgical-trainees" },
  FREIDA:        { label:"AMA FREIDA Residency & Fellowship Database",        url:"https://freida.ama-assn.org/" },
  CA_PFL:        { label:"CA EDD Paid Family Leave Program",                  url:"https://edd.ca.gov/en/disability/paid-family-leave/" },
  NY_PFL:        { label:"NY Paid Family Leave Law",                          url:"https://paidfamilyleave.ny.gov/" },
  MA_PFL:        { label:"MA Paid Family & Medical Leave (PFML)",             url:"https://www.mass.gov/info-details/paid-family-and-medical-leave-pfml-overview-and-benefits" },
  WA_PFL:        { label:"WA Paid Family & Medical Leave",                    url:"https://paidleave.wa.gov/" },
  OR_PFL:        { label:"OR Paid Leave Oregon (eff. Sep 2023)",              url:"https://paidleave.oregon.gov/" },
  CO_PFL:        { label:"CO FAMLI Program (eff. Jan 2024)",                  url:"https://famli.colorado.gov/" },
  CT_PFL:        { label:"CT Paid Leave Authority",                           url:"https://ctpaidleave.org/" },
  MN_PFL:        { label:"MN Paid Family & Medical Leave (eff. Jan 2026)",    url:"https://www.dli.mn.gov/paid-leave-protections" },
  DC_PFL:        { label:"DC Paid Family Leave Program",                      url:"https://does.dc.gov/page/dc-paid-family-leave" },
  RI_TCI:        { label:"RI Temporary Caregiver Insurance (TCI)",            url:"https://dlt.ri.gov/individuals/temporary-disability-caregiver-insurance" },
  MD_PFL:        { label:"MD Time to Care Act / FAMLI (eff. 2026)",           url:"https://www.dllr.state.md.us/paidleave/" },
  CIR_CONTRACT:  { label:"Committee of Interns & Residents (CIR/SEIU)",       url:"https://www.cirseiu.org/" },
  MGH_POLICY:    { label:"Mass General Brigham GME Policies",                 url:"https://www.massgeneralbrigham.org/en/education-and-training/graduate-medical-education/resources/policies" },
  COLUMBIA_GME:  { label:"Columbia Surgery — Plastic Surgery Residency",      url:"https://columbiasurgery.org/education-training/plastic-surgery-residency-program" },
  NYU_GME:       { label:"NYU Langone GME Policies & Services",              url:"https://med.nyu.edu/education/graduate-medical-education/policies-services" },
  YALE_GME:      { label:"Yale-New Haven Hospital House Staff Benefits",      url:"https://www.ynhh.org/medical-professionals/gme/resources/house-staff-benefits" },
  DUKE_GME:      { label:"Duke GME Residents & Fellows Benefits",             url:"https://gme.duke.edu/training-programs/applicants/gme-residents-fellows-benefits" },
  VUMC_GME:      { label:"Vanderbilt GME PGY-Parent Handbook",               url:"https://www.vumc.org/gme/sites/default/files/public_files/PGY-Parent-Handbook-2025-09.pdf" },
  JHU_RES:       { label:"Johns Hopkins/Univ of Maryland Plastic Surgery Residency", url:"https://www.hopkinsmedicine.org/plastic-reconstructive-surgery/education/residency-programs" },
  NORTHWESTERN_POLICY:{ label:"Northwestern Surgery Parental Leave Policy (2020)", url:"https://www.surgery.northwestern.edu/docs/gs-policies/parental-family-leave-policy-2020.pdf" },
  UCLA_GME:      { label:"UCLA GME Resident Benefits & Income",              url:"https://medschool.ucla.edu/gme-health-benefits-eligibility" },
  STANFORD_GME:  { label:"Stanford GME House Staff Benefits",                url:"https://med.stanford.edu/gme/housestaff/current/benefits.html" },
  UCSD_GME:      { label:"UC San Diego Graduate Medical Education",           url:"https://medschool.ucsd.edu/education/gme/Pages/default.aspx" },
  UW_GME:        { label:"University of Washington GME Resident Benefits",    url:"https://uwmedicine.org/education/graduate-medical-education" },
  OHSU_GME:      { label:"OHSU Plastic Surgery Residency Program",            url:"https://www.ohsu.edu/school-of-medicine/surgery/plastic-surgery-residency-program" },
  CO_GME:        { label:"Univ. of Colorado Peripartum Residency Policy (APSAPS 2023)", url:"https://apsapedsurg.org/wp-content/uploads/2023/04/Colorado-Residency-Peripartum-Policy.pdf" },
  UMICH_GME:     { label:"University of Michigan House Officers Association",  url:"https://hr.umich.edu/benefits-wellness/health/medical/housestaff" },
  MUSC_RES:      { label:"MUSC Plastic Surgery Residency Program",            url:"https://medicine.musc.edu/departments/surgery/education/residencies/plastic-surgery-integrated-residency-program" },
  PENN_STATE_RES:{ label:"Penn State Plastic Surgery Residency",              url:"https://med.psu.edu/residencies-fellowships/professional-programs/plastic-surgery-residency" },
  UCHICAGO_GME:  { label:"University of Chicago Medicine GME",                url:"https://gme.uchicago.edu/" },
  WUSM_GME:      { label:"Washington Univ. in St. Louis / BJC Plastic Surgery", url:"https://surgery.wustl.edu/education/residency-programs/plastic-surgery/" },
  UMN_GME:       { label:"University of Minnesota GME Stipends & Benefits",   url:"https://med.umn.edu/residents-fellows/current-residents-fellows/stipends-benefits" },
  HUMPHRIES_2016:{ label:"Humphries & Park, PRS Glob Open 2016 — Parental Leave in Plastic Surgery", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC4956880/" },
  CARRION_2025:  { label:"Carrion et al., PRS Glob Open 2025 — Program Director Attitudes", url:"https://pubmed.ncbi.nlm.nih.gov/40321323/" },
  UCSF_RES:      { label:"UCSF Plastic Surgery — ABPS Leave Policy Reference", url:"https://surgeryresidentportal.ucsf.edu/guidelines-family-leave-surgical-trainees" },
  HARVARD_PRS:   { label:"Harvard Plastic Surgery Combined Residency Program", url:"https://www.plasticsurgeryresidency.hms.harvard.edu/program" },
  MGB_GME:       { label:"Mass General Brigham GME Resources & Benefits",     url:"https://www.massgeneralbrigham.org/en/education-and-training/graduate-medical-education/resources/hr" },
  BROWN_RES:     { label:"Brown Plastic Surgery Residency Program",           url:"https://plasticsurgery.med.brown.edu/" },
  BU_RES:        { label:"BU Division of Plastic & Reconstructive Surgery",   url:"https://www.bumc.bu.edu/surgery/clinical-services/plastic-reconstructive-surgery/" },
  UCONN_RES:     { label:"UConn Plastic Surgery Education & Training",        url:"https://health.uconn.edu/plastic-surgery/education-and-training/" },
  MSSM_RES:      { label:"Mount Sinai Plastic Surgery Residency",             url:"https://icahn.mssm.edu/education/residencies-fellowships/list/msh-plastic-surgery-residency" },
  PENN_RES:      { label:"Penn Plastic Surgery Residency Program",            url:"https://www3.pennmedicine.org/departments-and-centers/department-of-surgery/education-and-training/residencies/plastic-surgery" },
  MEDSTAR_RES:   { label:"MedStar Georgetown Plastic Surgery Residency",      url:"https://www.medstarhealth.org/education/residency-programs/plastic-surgery" },
  JEFFERSON_RES: { label:"Jefferson GME Residency Programs",                  url:"https://www.jefferson.edu/academics/colleges-schools-institutes/skmc/residency.html" },
  DOWNSTATE_RES: { label:"SUNY Downstate Plastic Surgery Division",           url:"https://www.downstate.edu/education-training/fellowship-residency-programs/surgery/divisions/plastic-surgery.html" },
  ALBANY_RES:    { label:"Albany Med Plastic Surgery Residency",              url:"https://www.amc.edu/education/residencies-fellowships/plastic-surgery-residency/" },
  EMORY_RES:     { label:"Emory Plastic Surgery Residency Program",           url:"https://med.emory.edu/departments/surgery/education/plastic-surgery-residency/index.html" },
  UNC_RES:       { label:"UNC Plastic Surgery Education & Training",          url:"https://www.med.unc.edu/surgery/plastic/education/" },
  UF_RES:        { label:"UF Plastic Surgery Integrated Residency",           url:"https://plasticandreconstructive.surgery.med.ufl.edu/education/integrated-residency/" },
  MIAMI_RES:     { label:"UM/Jackson Plastic Surgery Integrated Residency",   url:"https://graduate.jacksonhealth.org/program/plastic-surgery-integrated/" },
  WAKE_RES:      { label:"Wake Forest Plastic Surgery Residency",             url:"https://school.wakehealth.edu/education-and-training/residencies-and-fellowships/plastic-reconstructive-surgery-residency" },
  UVA_RES:       { label:"UVA Plastic Surgery Residency Program",             url:"https://med.virginia.edu/plastic-surgery-and-oral-health/residency-programs-and-education/" },
  UAB_RES:       { label:"UAB Plastic Surgery Residency Program",             url:"https://www.uab.edu/medicine/surgery/plastic/education/residency" },
  UMMC_RES:      { label:"UMMC Plastic Surgery Residency Program",            url:"https://www.umc.edu/som/Departments%20and%20Offices/SOM%20Departments/Surgery/Residents/Plastic-Surgery1/Overview1.html" },
  OSU_RES:       { label:"OSU Plastic Surgery Residency Program",             url:"https://medicine.osu.edu/departments/plastic-reconstructive-surgery/education/residency" },
  CASE_RES:      { label:"MetroHealth/Case Western Surgery Residency",        url:"https://gme.metrohealth.org/surgery-residency" },
  IU_RES:        { label:"IU Plastic Surgery Residency Program",              url:"https://medicine.iu.edu/surgery/education/residency/plastic-surgery" },
  HENRY_FORD_RES:{ label:"Henry Ford Plastic Surgery Residency",              url:"https://www.henryford.com/hcp/med-ed/residencies-fellowships/hfh/plastics" },
  LOYOLA_RES:    { label:"Loyola Stritch Surgery Residency Programs",         url:"https://ssom.luc.edu/surgery/residencyfellowships/" },
  SIU_RES:       { label:"SIU GME Resident & Fellow Information",             url:"https://www.siumed.edu/gme/springfield-based-resident-and-fellow-information" },
  UW_WISC_RES:   { label:"UW-Madison Plastic Surgery Residency",             url:"https://www.surgery.wisc.edu/education-training/residencies/plastic-surgery-residency/" },
  KU_RES:        { label:"KU Plastic Surgery Residency Program",              url:"https://www.kumc.edu/school-of-medicine/academics/departments/plastic-burn-and-wound-surgery/academics/residency-program.html" },
  UTSW_RES:      { label:"UTSW Plastic Surgery Residency Program",           url:"https://www.utsouthwestern.edu/departments/plastic-surgery/education-training/residency-program/" },
  BCM_RES:       { label:"Baylor Plastic Surgery Integrated Residency",       url:"https://www.bcm.edu/departments/surgery/education/training-programs/plastic-surgery-integrated-residency" },
  UTHOUSTON_RES: { label:"UTHealth Plastic Surgery Residency",                url:"https://med.uth.edu/surgery/education/residency/plastic-surgery-residency/" },
  UARIZONA_RES:  { label:"U of Arizona Plastic Surgery Residency",            url:"https://surgery.arizona.edu/residencies-fellowships/plastic-surgery-residency-program/residency-rotations" },
  UNM_RES:       { label:"UNM Plastic, Hand & Burn Residency Program",       url:"https://hsc.unm.edu/school-of-medicine/surgery/residency/plastic-burn-hand/index.html" },
  USC_RES:       { label:"USC Keck Plastic Surgery Integrated Residency",     url:"https://keck.usc.edu/surgery/training-education/residencies/plastics-integrated-residency-program/" },
  UCDAVIS_RES:   { label:"UC Davis Plastic Surgery Residency",               url:"https://health.ucdavis.edu/surgery/education/plastic_residents.html" },
  UH_RES:        { label:"UH JABSOM Department of Surgery",                   url:"https://surgery.jabsom.hawaii.edu/" },
};

const PROGRAMS = [
  { id:1, name:"Harvard/MGH", city:"Boston", state:"MA", region:"Northeast", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CIR/SEIU union contract may provide additional leave — verify directly with program. MA PFML provides state wage replacement. MGH house staff manual documents equal leave for birth and non-birth parents, adoption, and foster care.",
    sources:["HARVARD_PRS","MGH_POLICY","CIR_CONTRACT","MA_PFL","MGB_GME"] },
  { id:2, name:"Harvard/Brigham & Women's", city:"Boston", state:"MA", region:"Northeast", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CIR/SEIU union-backed program. Equal leave for all genders and family formations per BWH GME policy. MA PFML provides additional state supplement. On-site childcare at Longwood campus.",
    sources:["HARVARD_PRS","MGB_GME","CIR_CONTRACT","MA_PFL","GODBE_2025"] },
  { id:3, name:"Columbia/Weill Cornell", city:"New York", state:"NY", region:"Northeast", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CIR union contract covers both NYP campuses. NY PFL adds state supplement at 67% wages for 12 weeks. On-site childcare at NYP. Verify current paid leave weeks directly with program.",
    sources:["COLUMBIA_GME","CIR_CONTRACT","NY_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:4, name:"NYU Langone", city:"New York", state:"NY", region:"Northeast", union:true, verified:true,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Verified: 6 wks paid per ACGME minimum (some program-specific policies note 6–8 wks). CIR/SEIU union contract. NY PFL supplements at 67% wages for 12 wks. On-site childcare at Bellevue/NYU campus. Godbe et al. 2025 classifies NYU as unionized with above-average parental leave.",
    sources:["NYU_GME","CIR_CONTRACT","NY_PFL","GODBE_2025","KASEMODEL_2022"] },
  { id:5, name:"Yale School of Medicine", city:"New Haven", state:"CT", region:"Northeast", union:false, verified:true,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Verified: 8 wks employer-paid parental leave (Yale-New Haven Hospital policy). CT Paid Leave Authority covers wks 9–12 at state rate (~$900/wk). 16 wks total FMLA available. On-site childcare at Yale-New Haven campus.",
    sources:["YALE_GME","CT_PFL","ACGME_BLOG","FREIDA","KASEMODEL_2022"] },
  { id:6, name:"Brown/Rhode Island Hospital", city:"Providence", state:"RI", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:5, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. RI Temporary Caregiver Insurance adds ~6 wks at 60% wages. Formal policy exists in GME handbook but not fully public. Subsidized childcare referral through Brown campus.",
    sources:["BROWN_RES","RI_TCI","ACGME_BLOG","HUMPHRIES_2016","GODBE_2025"] },
  { id:7, name:"Boston University", city:"Boston", state:"MA", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. MA PFML supplements with up to 12 wks at 80% wages. GME policy documented but specific paid weeks not confirmed publicly. Campus childcare subsidized.",
    sources:["BU_RES","MA_PFL","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016"] },
  { id:8, name:"UConn Health", city:"Farmington", state:"CT", region:"Northeast", union:false, verified:true,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:4, statePFL:10, noExtReq:10,
    note:"Verified: 6 wks paid at 100% (one-time). Residents must use vacation/sick first. CT Paid Leave Authority covers additional weeks if needed. UConn as a state institution meets ACGME minimum. Limited on-site childcare.",
    sources:["UCONN_RES","CT_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:9, name:"Icahn/Mount Sinai", city:"New York", state:"NY", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. NY PFL supplements at 67% wages for 12 wks. On-site childcare available at main campus. GME policy documented but specific paid weeks not confirmed via primary source.",
    sources:["MSSM_RES","NY_PFL","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:10, name:"University of Pennsylvania", city:"Philadelphia", state:"PA", region:"Northeast", union:false, verified:true,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:7, statePFL:0, noExtReq:10,
    note:"Verified: 8 wks paid (6 wks FMLA + 2 wks new child leave per CIR/SEIU contract ratified Oct 2024; additional leave bank available for up to 4 more wks). PA has no state PFL. Subsidized childcare available through Penn Benefits.",
    sources:["PENN_RES","ACGME_BLOG","GODBE_2025","KASEMODEL_2022","ACS_STMT"] },
  { id:11, name:"Johns Hopkins/Univ of Maryland", city:"Baltimore", state:"MD", region:"Northeast", union:true, verified:true,
    paidWeeks:8, genderEquity:20, formalPolicy:15, childcare:10, statePFL:5, noExtReq:10,
    note:"Verified: 8 wks paid under New Child Accommodations Policy. No make-up call required. JHU house staff unionized. MD Time to Care/FAMLI launched 2026 providing additional state supplement. On-site childcare at JHH.",
    sources:["JHU_RES","CIR_CONTRACT","MD_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:12, name:"Georgetown/MedStar", city:"Washington", state:"DC", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. DC Paid Family Leave (12 wks) substantially supplements. Policy in GME handbook but detailed public documentation limited. Subsidized childcare available.",
    sources:["MEDSTAR_RES","DC_PFL","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016"] },
  { id:13, name:"Penn State/Hershey", city:"Hershey", state:"PA", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. PA has no state PFL. Limited childcare at Hershey campus. FREIDA database listing and program website confirm ACGME compliance.",
    sources:["PENN_STATE_RES","FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:14, name:"Thomas Jefferson University", city:"Philadelphia", state:"PA", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"PA has no state PFL; meets ACGME minimum of 6 wks; no formal written parental leave policy found publicly on program or GME website; limited childcare resources; FREIDA listing confirms ACGME compliance only.",
    sources:["JEFFERSON_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:15, name:"SUNY Downstate", city:"Brooklyn", state:"NY", region:"Northeast", union:true, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:4, statePFL:10, noExtReq:5,
    note:"CIR union affiliation. NY PFL supplements institutional leave at 67% wages for 12 wks. Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. Godbe et al. 2025 classifies as unionized. Limited childcare on site.",
    sources:["DOWNSTATE_RES","CIR_CONTRACT","NY_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:16, name:"Albany Medical Center", city:"Albany", state:"NY", region:"Northeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:10, noExtReq:5,
    note:"NY PFL available as state supplement. ACGME minimum 6 wks met. No formal written parental leave policy found on program website or GME page. No dedicated on-site childcare identified. FREIDA listing only.",
    sources:["ALBANY_RES","NY_PFL","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:17, name:"Duke University", city:"Durham", state:"NC", region:"Southeast", union:false, verified:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"Verified: 12 wks total paid (6 wks paid parental leave per DUHS policy + separate 6 wks paid medical/caregiver leave per program; vacation NOT applied to parental leave). Comprehensive gender-equity provisions covering birth, adoption, and foster care. On-site childcare at Duke campus. NC has no state PFL.",
    sources:["DUKE_GME","FREIDA","ACGME_BLOG","KASEMODEL_2022","ACS_STMT"] },
  { id:18, name:"Emory University", city:"Atlanta", state:"GA", region:"Southeast", union:false, verified:true,
    paidWeeks:9, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Verified: 9 wks paid (6 wks paid parental leave per occurrence + up to 3 wks paid medical leave for birth parent; effective July 2022). GA has no state PFL. Subsidized childcare referral available through Emory benefits.",
    sources:["EMORY_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:19, name:"UNC Chapel Hill", city:"Chapel Hill", state:"NC", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. State institution. NC has no state PFL. UNC campus childcare center available to residents. Godbe et al. 2025 cites NC programs.",
    sources:["UNC_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","CARRION_2025"] },
  { id:20, name:"University of Florida", city:"Gainesville", state:"FL", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"FL has no state PFL. ACGME minimum met. Formal parental leave policy not publicly documented on UF GME or plastic surgery program pages. Limited childcare. Humphries & Park 2016 noted FL programs as among those lacking formal policies.",
    sources:["UF_RES","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE","CARRION_2025"] },
  { id:21, name:"University of Miami", city:"Miami", state:"FL", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"FL has no state PFL. Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. No on-site childcare at Jackson Memorial site. FREIDA listing confirms ACGME compliance. Policy exists in GME handbook.",
    sources:["MIAMI_RES","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE","GODBE_2025"] },
  { id:22, name:"Vanderbilt University", city:"Nashville", state:"TN", region:"Southeast", union:false, verified:true,
    paidWeeks:6, genderEquity:15, formalPolicy:15, childcare:7, statePFL:0, noExtReq:10,
    note:"Verified: 6 wks paid per ACGME/SOM policy (FMLA provides up to 12 wks total; TN Maternity Leave Act may allow up to 4 months). TN has no state PFL. VUMC GME policy publicly documented. Subsidized childcare through Vanderbilt benefits.",
    sources:["VUMC_GME","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:23, name:"Wake Forest/Atrium Health", city:"Winston-Salem", state:"NC", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"NC has no state PFL. Meets ACGME 6-wk minimum. No formal written parental leave policy found on Wake Forest GME or Atrium Health website. No dedicated on-site childcare identified. FREIDA listing only.",
    sources:["WAKE_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:24, name:"MUSC", city:"Charleston", state:"SC", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. SC has no state PFL. GME policy documented internally. Limited childcare infrastructure. MUSC program page and FREIDA database consulted.",
    sources:["MUSC_RES","FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:25, name:"University of Virginia", city:"Charlottesville", state:"VA", region:"Southeast", union:false, verified:true,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Verified: 6 wks paid per ACGME (benefits extended for up to 8 wks during parental leave; PPL once per 12-month period). VA has no broad state PFL. Subsidized childcare available at UVA facilities through housestaff benefits.",
    sources:["UVA_RES","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE","GODBE_2025"] },
  { id:26, name:"UAB", city:"Birmingham", state:"AL", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"AL has no state PFL. ACGME minimum only. No formal written parental leave policy found publicly on UAB GME or plastic surgery program pages. No dedicated on-site childcare. FREIDA listing only.",
    sources:["UAB_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:27, name:"University of Mississippi", city:"Jackson", state:"MS", region:"Southeast", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"MS has no state PFL. UMC program overview confirms ACGME accreditation. No formal parental leave policy found publicly. Limited institutional support for childcare documented. FREIDA and program website consulted.",
    sources:["UMMC_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:28, name:"University of Michigan", city:"Ann Arbor", state:"MI", region:"Midwest", union:true, verified:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"Verified: 12–14 wks paid (6 wks vaginal delivery or 8 wks C-section maternity leave + 6 wks parental bonding; HOA union contract). Comprehensive gender-equity provisions. On-site childcare at U-M Health. Godbe et al. 2025 lists U-M as unionized with above-average parental leave.",
    sources:["UMICH_GME","CIR_CONTRACT","FREIDA","GODBE_2025","ACGME_BLOG"] },
  { id:29, name:"Northwestern University", city:"Chicago", state:"IL", region:"Midwest", union:false, verified:true,
    paidWeeks:6, genderEquity:15, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"Verified: 6 wks paid childrearing leave at 100% salary (gender-neutral; subsequent child in same program: 2 wks). IL has no state PFL. Northwestern published parental leave policy (2020) is publicly available. Lurie Children's on-site childcare adjacent.",
    sources:["NORTHWESTERN_POLICY","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:30, name:"University of Chicago", city:"Chicago", state:"IL", region:"Midwest", union:false, verified:true,
    paidWeeks:12, genderEquity:15, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"Verified: 12 wks paid (6 wks paid medical/parental leave for birth parent + 6 wks paid parental bonding for all parents; subsequent child: 2 wks). UChicago Medicine GME policy publicly documented. IL has no state PFL. On-site childcare available.",
    sources:["UCHICAGO_GME","FREIDA","HUMPHRIES_2016","ACGME_BLOG","GODBE_2025"] },
  { id:31, name:"Washington Univ St. Louis", city:"St. Louis", state:"MO", region:"Midwest", union:false, verified:true,
    paidWeeks:6, genderEquity:15, formalPolicy:15, childcare:7, statePFL:0, noExtReq:10,
    note:"Verified: 6 wks paid (using vacation/personal/sick days); one-time additional 2 wks PTO available during entire training, making effective total up to 8 wks. MO has no state PFL. Subsidized childcare through BJC Benefits.",
    sources:["WUSM_GME","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:32, name:"Ohio State University", city:"Columbus", state:"OH", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. OSU Wexner Medical Center GME provides leave with equity language. OH has no state PFL. Campus childcare referral available.",
    sources:["OSU_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:33, name:"Case Western/MetroHealth", city:"Cleveland", state:"OH", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:5,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. OH has no state PFL. Policy documented but limited public transparency. Limited childcare.",
    sources:["CASE_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:34, name:"University of Minnesota", city:"Minneapolis", state:"MN", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:15, childcare:7, statePFL:5, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. MN Paid Family & Medical Leave Act launched January 2026 providing partial state supplement. M Health Fairview campus childcare. Formal policy publicly accessible.",
    sources:["UMN_GME","MN_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:35, name:"Indiana University", city:"Indianapolis", state:"IN", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"IN has no state PFL. Meets ACGME 6-wk minimum. Limited formal policy documentation found publicly. Limited childcare resources.",
    sources:["IU_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:36, name:"Henry Ford Hospital", city:"Detroit", state:"MI", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. MI has no state PFL. Formal policy in GME handbook. Childcare referral through Henry Ford benefits.",
    sources:["HENRY_FORD_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:37, name:"Loyola University", city:"Chicago", state:"IL", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"IL has no state PFL. Stritch GME meets ACGME 6-wk minimum. Limited formal policy documentation on public-facing GME website. Limited childcare.",
    sources:["LOYOLA_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:38, name:"SIU School of Medicine", city:"Springfield", state:"IL", region:"Midwest", union:false, verified:true,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"Verified: 6 wks paid parental leave at 100% salary per U of I system policy (eff. Aug 2023). IL has no state PFL. Additional FMLA up to 12 wks (unpaid) available. No dedicated on-site childcare found.",
    sources:["SIU_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:39, name:"University of Wisconsin", city:"Madison", state:"WI", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. WI has no state PFL. UW Health GME policy includes equity language. State campus childcare available.",
    sources:["UW_WISC_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:40, name:"University of Kansas", city:"Kansas City", state:"KS", region:"Midwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"KS has no state PFL. ACGME minimum met. No formal parental leave policy found on public GME or program pages. No dedicated on-site childcare identified. FREIDA listing only.",
    sources:["KU_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:41, name:"UT Southwestern", city:"Dallas", state:"TX", region:"Southwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. TX has no state PFL. UTSW GME documents a parental leave policy. Formal policy in GME handbook. Limited childcare at Parkland/UTSW campus.",
    sources:["UTSW_RES","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:42, name:"Baylor College of Medicine", city:"Houston", state:"TX", region:"Southwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"TX has no state PFL. Meets ACGME 6-wk minimum. Limited formal parental leave policy transparency on public-facing GME website. Limited childcare.",
    sources:["BCM_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:43, name:"UTHealth Houston", city:"Houston", state:"TX", region:"Southwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"TX has no state PFL. ACGME minimum compliant. No formal written parental leave policy found publicly on UTHealth GME or program pages. FREIDA listing only.",
    sources:["UTHOUSTON_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:44, name:"University of Arizona", city:"Tucson", state:"AZ", region:"Southwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"AZ has no state PFL. Banner-UA GME meets ACGME standard. No formal written parental leave policy found on public-facing pages. Limited childcare. FREIDA database and ABPS leave policy baseline consulted.",
    sources:["UARIZONA_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:45, name:"University of New Mexico", city:"Albuquerque", state:"NM", region:"Southwest", union:false, verified:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"NM has no state PFL. State institution meeting ACGME minimum. Limited documentation on public GME website. Limited childcare resources.",
    sources:["UNM_RES","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:46, name:"UCSF", city:"San Francisco", state:"CA", region:"West", union:true, verified:true,
    paidWeeks:8, genderEquity:20, formalPolicy:15, childcare:15, statePFL:10, noExtReq:10,
    note:"Verified: 8 wks paid leave per academic year per event (eff. Jan 2023). CA state laws (PDL+CFRA) may extend coverage to ~7 months with partial pay. CIR union contract; on-site and subsidized childcare; CA PFL supplements up to 8 wks at 60–70% wages.",
    sources:["UCSF_PORTAL","UCSF_RES","CIR_CONTRACT","CA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:47, name:"UCLA", city:"Los Angeles", state:"CA", region:"West", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:15, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CIR union contract covers UCLA Health. On-site childcare at WLA campus. CA PFL supplements. Verify current paid leave weeks directly with program.",
    sources:["UCLA_GME","CIR_CONTRACT","CA_PFL","GODBE_2025","KASEMODEL_2022","ACGME_BLOG"] },
  { id:48, name:"Stanford University", city:"Stanford", state:"CA", region:"West", union:false, verified:true,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:15, statePFL:10, noExtReq:10,
    note:"Verified: 6 wks paid institutional leave per ACGME minimum + CA State Disability Insurance (SDI) and CA PFL supplements (partial pay). CA CFRA provides additional job-protected bonding leave. On-site childcare at Lucile Packard and Stanford facilities. Comprehensive, publicly documented policy.",
    sources:["STANFORD_GME","CA_PFL","FREIDA","KASEMODEL_2022","ACGME_BLOG","GODBE_2025"] },
  { id:49, name:"UC San Diego", city:"San Diego", state:"CA", region:"West", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CIR union contract. CA PFL supplements. On-site childcare at UCSD Health campus. Verify current paid leave weeks directly with program.",
    sources:["UCSD_GME","CIR_CONTRACT","CA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:50, name:"USC Keck", city:"Los Angeles", state:"CA", region:"West", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CA PFL supplements USC institutional policy. Non-union but CA PFL provides meaningful state supplement. Subsidized childcare referral through USC benefits.",
    sources:["USC_RES","CA_PFL","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:51, name:"UC Davis", city:"Sacramento", state:"CA", region:"West", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CIR union contract. CA PFL supplements up to 8 wks at 60–70% wages. On-site childcare at UC Davis Health. Comprehensive equity provisions.",
    sources:["UCDAVIS_RES","CIR_CONTRACT","CA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:52, name:"University of Washington", city:"Seattle", state:"WA", region:"West", union:true, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. UW Medicine housestaff unionized. WA Paid Family & Medical Leave provides up to 12 wks at 70–90% wages as supplement. On-site childcare at UW Medical Center.",
    sources:["UW_GME","CIR_CONTRACT","WA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:53, name:"OHSU", city:"Portland", state:"OR", region:"West", union:false, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. OR Paid Leave Oregon (launched Sep 2023) provides up to 12 wks at up to 100% wages for lower earners. OHSU GME policy documents parental leave. On-site childcare at main campus.",
    sources:["OHSU_GME","OR_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:54, name:"University of Colorado", city:"Aurora", state:"CO", region:"West", union:false, verified:false,
    paidWeeks:6, genderEquity:20, formalPolicy:15, childcare:7, statePFL:10, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. CO FAMLI program (launched Jan 2024) provides up to 12 wks at 90% wages. UCHealth/Anschutz GME published peripartum residency policy (APSAPS 2023) includes equity provisions. Subsidized childcare through CU Benefits.",
    sources:["CO_GME","CO_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:55, name:"University of Hawaii", city:"Honolulu", state:"HI", region:"West", union:false, verified:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Institutional paid weeks not independently verified; reflects ACGME 6-wk minimum. HI has no state PFL program. Policy in GME handbook. Subsidized childcare available through UH system.",
    sources:["UH_RES","ACGME_BLOG","ACS_STMT","ABPS_LEAVE","HUMPHRIES_2016"] },
];

const MAX_TOTAL = 82;
const withScores = PROGRAMS.map(p => {
  const paidWeeksScore = p.paidWeeks;
  const total = paidWeeksScore + p.genderEquity + p.formalPolicy + p.childcare + p.statePFL + p.noExtReq;
  return { ...p, paidWeeksScore, total };
});

const TIERS = [
  { label:"Tier 1 — Exceptional", min:70, color:"#059669", dot:"#10b981" },
  { label:"Tier 2 — Strong",      min:57, color:"#0284c7", dot:"#3b82f6" },
  { label:"Tier 3 — Adequate",    min:45, color:"#d97706", dot:"#f59e0b" },
  { label:"Tier 4 — Minimal",     min:0,  color:"#dc2626", dot:"#ef4444" },
];
function getTier(s){ return TIERS.find(t=>s>=t.min)||TIERS[3]; }

const CRITERIA = [
  { key:"paidWeeksScore", label:"Paid Leave (wks)",        max:12, desc:"Actual weeks of 100% paid institutional parental leave" },
  { key:"genderEquity",   label:"Gender & Family Equity", max:20, desc:"Equal leave for all genders, adoption, foster care" },
  { key:"formalPolicy",   label:"Formal Written Policy",  max:15, desc:"Transparency of publicly documented policy" },
  { key:"childcare",      label:"Childcare Support",      max:15, desc:"On-site, subsidized, and backup childcare" },
  { key:"statePFL",       label:"State PFL Supplement",   max:10, desc:"State-mandated paid family leave program" },
  { key:"noExtReq",       label:"No Extension Required",  max:10, desc:"Flexibility without mandatory training extension" },
];

/* Which scoring criteria each source primarily informs */
const SOURCE_CRITERIA = {
  // Program-specific pages → paid weeks, formal policy, childcare, gender equity
  HARVARD_PRS:["paidWeeksScore","formalPolicy","genderEquity"],
  MGB_GME:["paidWeeksScore","formalPolicy","childcare"],
  BROWN_RES:["paidWeeksScore","formalPolicy"],BU_RES:["paidWeeksScore","formalPolicy"],
  UCONN_RES:["paidWeeksScore","formalPolicy"],MSSM_RES:["paidWeeksScore","formalPolicy"],
  PENN_RES:["paidWeeksScore","formalPolicy"],MEDSTAR_RES:["paidWeeksScore","formalPolicy"],
  JEFFERSON_RES:["paidWeeksScore","formalPolicy"],DOWNSTATE_RES:["paidWeeksScore","formalPolicy"],
  ALBANY_RES:["paidWeeksScore","formalPolicy"],EMORY_RES:["paidWeeksScore","formalPolicy"],
  UNC_RES:["paidWeeksScore","formalPolicy"],UF_RES:["paidWeeksScore","formalPolicy"],
  MIAMI_RES:["paidWeeksScore","formalPolicy"],WAKE_RES:["paidWeeksScore","formalPolicy"],
  UVA_RES:["paidWeeksScore","formalPolicy"],UAB_RES:["paidWeeksScore","formalPolicy"],
  UMMC_RES:["paidWeeksScore","formalPolicy"],OSU_RES:["paidWeeksScore","formalPolicy"],
  CASE_RES:["paidWeeksScore","formalPolicy"],IU_RES:["paidWeeksScore","formalPolicy"],
  HENRY_FORD_RES:["paidWeeksScore","formalPolicy"],LOYOLA_RES:["paidWeeksScore","formalPolicy"],
  SIU_RES:["paidWeeksScore","formalPolicy"],UW_WISC_RES:["paidWeeksScore","formalPolicy"],
  KU_RES:["paidWeeksScore","formalPolicy"],UTSW_RES:["paidWeeksScore","formalPolicy"],
  BCM_RES:["paidWeeksScore","formalPolicy"],UTHOUSTON_RES:["paidWeeksScore","formalPolicy"],
  UARIZONA_RES:["paidWeeksScore","formalPolicy"],UNM_RES:["paidWeeksScore","formalPolicy"],
  USC_RES:["paidWeeksScore","formalPolicy"],UCDAVIS_RES:["paidWeeksScore","formalPolicy"],
  UH_RES:["paidWeeksScore","formalPolicy"],MUSC_RES:["paidWeeksScore","formalPolicy"],
  PENN_STATE_RES:["paidWeeksScore","formalPolicy"],
  // Institutional GME pages → paid weeks, formal policy, childcare, gender equity
  COLUMBIA_GME:["paidWeeksScore","formalPolicy"],NYU_GME:["paidWeeksScore","formalPolicy","childcare"],
  MGH_POLICY:["paidWeeksScore","formalPolicy","genderEquity"],
  YALE_GME:["paidWeeksScore","formalPolicy","childcare"],
  DUKE_GME:["paidWeeksScore","formalPolicy","childcare","genderEquity"],
  VUMC_GME:["paidWeeksScore","formalPolicy","genderEquity"],
  JHU_RES:["paidWeeksScore","formalPolicy","genderEquity"],
  NORTHWESTERN_POLICY:["paidWeeksScore","formalPolicy","genderEquity"],
  UCLA_GME:["paidWeeksScore","formalPolicy","childcare"],
  STANFORD_GME:["paidWeeksScore","formalPolicy","childcare"],
  UCSD_GME:["paidWeeksScore","formalPolicy"],
  UW_GME:["paidWeeksScore","formalPolicy"],
  OHSU_GME:["paidWeeksScore","formalPolicy","childcare"],
  CO_GME:["paidWeeksScore","formalPolicy","genderEquity"],
  UMICH_GME:["paidWeeksScore","formalPolicy","genderEquity","childcare"],
  UCHICAGO_GME:["paidWeeksScore","formalPolicy","childcare"],
  WUSM_GME:["paidWeeksScore","formalPolicy"],
  UMN_GME:["paidWeeksScore","formalPolicy","childcare"],
  UCSF_PORTAL:["paidWeeksScore","formalPolicy","noExtReq"],
  UCSF_RES:["paidWeeksScore","noExtReq"],
  // Union / collective bargaining → paid weeks, gender equity
  CIR_CONTRACT:["paidWeeksScore","genderEquity"],
  // Research literature
  GODBE_2025:["genderEquity","childcare","paidWeeksScore"],
  KASEMODEL_2022:["genderEquity","paidWeeksScore"],
  HUMPHRIES_2016:["formalPolicy","paidWeeksScore"],
  CARRION_2025:["formalPolicy"],
  GATES_2024:["genderEquity"],
  // Policy standards → no-extension, formal policy
  ACGME_BLOG:["noExtReq","formalPolicy"],
  ABPS_LEAVE:["noExtReq"],
  ACS_STMT:["noExtReq","genderEquity"],
  FREIDA:["paidWeeksScore","childcare"],
  // State PFL
  CA_PFL:["statePFL"],NY_PFL:["statePFL"],MA_PFL:["statePFL"],WA_PFL:["statePFL"],
  OR_PFL:["statePFL"],CO_PFL:["statePFL"],CT_PFL:["statePFL"],MN_PFL:["statePFL"],
  DC_PFL:["statePFL"],RI_TCI:["statePFL"],MD_PFL:["statePFL"],
};

const STATE_PFL = ["CA","NY","NJ","WA","MA","CT","CO","OR","RI","MN","MD","DC","DE","ME"];
const REGIONS = ["All","Northeast","Southeast","Midwest","Southwest","West"];

export default function App() {
  const [sel, setSel] = useState(null);
  const [sortBy, setSortBy] = useState("total");
  const [sortDir, setSortDir] = useState("desc");
  const [region, setRegion] = useState("All");
  const [tier, setTier] = useState("All");
  const [union, setUnion] = useState("All");
  const [q, setQ] = useState("");

  const rows = useMemo(()=>{
    let d = [...withScores];
    if(region!=="All") d=d.filter(p=>p.region===region);
    if(tier!=="All")   d=d.filter(p=>getTier(p.total).label===tier);
    if(union==="Unionized")    d=d.filter(p=>p.union);
    if(union==="Non-unionized") d=d.filter(p=>!p.union);
    if(q) d=d.filter(p=>[p.name,p.city,p.state].join(" ").toLowerCase().includes(q.toLowerCase()));
    return d.sort((a,b)=>{
      const av=a[sortBy],bv=b[sortBy];
      if(typeof av==="boolean") return sortDir==="desc"?(bv?1:0)-(av?1:0):(av?1:0)-(bv?1:0);
      return sortDir==="desc"?bv-av:av-bv;
    });
  },[sortBy,sortDir,region,tier,union,q]);

  function toggleSort(k){ if(sortBy===k)setSortDir(d=>d==="desc"?"asc":"desc");else{setSortBy(k);setSortDir("desc");} }

  const avg=Math.round(withScores.reduce((a,p)=>a+p.total,0)/withScores.length);
  const t1=withScores.filter(p=>p.total>=85).length;
  const uA=Math.round(withScores.filter(p=>p.union).reduce((a,p)=>a+p.total,0)/withScores.filter(p=>p.union).length);
  const nA=Math.round(withScores.filter(p=>!p.union).reduce((a,p)=>a+p.total,0)/withScores.filter(p=>!p.union).length);
  const verifiedCount=withScores.filter(p=>p.verified).length;

  const th = (key,label,w)=>(
    <th key={key} onClick={()=>toggleSort(key)} style={{padding:"10px 14px",textAlign:"left",fontSize:11,
      fontWeight:700,letterSpacing:.5,textTransform:"uppercase",color:"#6b7280",cursor:"pointer",
      whiteSpace:"nowrap",width:w,userSelect:"none",background:"#f9fafb"}}>
      {label}{sortBy===key?(sortDir==="desc"?" ↓":" ↑"):""}
    </th>
  );

  return (
    <div style={{fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",background:"#f8f7f4",minHeight:"100vh",color:"#1a1a2e"}}>
      <div style={{background:"#1a1a2e",color:"white",padding:"32px 40px 28px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",color:"#94a3b8",marginBottom:8}}>Residency Policy Intelligence</div>
            <h1 style={{margin:0,fontSize:28,fontWeight:800,lineHeight:1.2,letterSpacing:-.5}}>
              Plastic Surgery Residency<br/><span style={{color:"#38bdf8"}}>Parental Leave Index</span>
            </h1>
            <p style={{marginTop:12,marginBottom:0,fontSize:13,color:"#94a3b8",maxWidth:500,lineHeight:1.6}}>
              55 ACGME-accredited programs ranked across 6 criteria. Click any row to view the score breakdown and all cited sources for that program.
            </p>
          </div>
          <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
            {[{v:55,l:"Programs"},{v:`${avg}/${MAX_TOTAL}`,l:"Avg Score"},{v:t1,l:"Tier 1"},{v:`+${uA-nA}pts`,l:"Union Advantage"}].map(s=>(
              <div key={s.l} style={{textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:800,color:"#38bdf8",lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:"#64748b",marginTop:4,whiteSpace:"nowrap"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"white",borderBottom:"1px solid #e5e7eb",padding:"12px 40px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:"#6b7280",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Tiers:</span>
          {TIERS.map(t=>(
            <div key={t.label} style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
              <div style={{width:9,height:9,borderRadius:2,background:t.dot}}/>
              <span style={{color:t.color,fontWeight:600}}>{t.label.split("—")[0].trim()}</span>
              <span style={{color:"#9ca3af"}}>— {t.label.split("—")[1]} ({t.min===0?`<${TIERS[2].min}`:`≥${t.min}`}pts)</span>
            </div>
          ))}
          <div style={{marginLeft:"auto",fontSize:11,color:"#9ca3af"}}>⚠ Click any row for sources · Verify with programs directly</div>
        </div>
      </div>

      {/* Data confidence legend */}
      <div style={{background:"#fafafa",borderBottom:"1px solid #e5e7eb",padding:"10px 40px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:"#6b7280",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Paid Wks Confidence:</span>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}>
            <div style={{width:14,height:14,borderRadius:3,background:"#dcfce7",border:"1px solid #86efac"}}/>
            <span style={{color:"#15803d",fontWeight:600}}>Verified</span>
            <span style={{color:"#9ca3af"}}>— paid weeks confirmed from institutional GME policy ({verifiedCount} programs)</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12}}>
            <div style={{width:14,height:14,borderRadius:3,background:"#fef9c3",border:"1px solid #fde047"}}/>
            <span style={{color:"#a16207",fontWeight:600}}>Estimated</span>
            <span style={{color:"#9ca3af"}}>— defaults to ACGME 6-wk minimum; institutional policy not independently verified ({55-verifiedCount} programs)</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 40px"}}>
        <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search programs, city, state…"
            style={{padding:"8px 14px",borderRadius:8,border:"1px solid #d1d5db",fontSize:13,width:230,outline:"none"}}/>
          {[{l:"Region",v:region,s:setRegion,o:REGIONS},
            {l:"Tier",v:tier,s:setTier,o:["All",...TIERS.map(t=>t.label)]},
            {l:"Union",v:union,s:setUnion,o:["All","Unionized","Non-unionized"]}].map(f=>(
            <select key={f.l} value={f.v} onChange={e=>f.s(e.target.value)}
              style={{padding:"8px 12px",borderRadius:8,border:"1px solid #d1d5db",fontSize:13,cursor:"pointer",outline:"none",background:"white"}}>
              {f.o.map(o=><option key={o}>{o}</option>)}
            </select>
          ))}
          <span style={{marginLeft:"auto",fontSize:13,color:"#6b7280"}}>Showing <strong>{rows.length}</strong> / {withScores.length}</span>
        </div>

        <div style={{background:"white",borderRadius:12,border:"1px solid #e5e7eb",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead>
                <tr style={{borderBottom:"2px solid #e5e7eb"}}>
                  {th("total","Score",75)}{th("name","Program",210)}{th("state","State",55)}{th("region","Region",90)}
                  {th("paidWeeks","Paid Wks",80)}{th("genderEquity","Equity",68)}{th("formalPolicy","Policy",65)}
                  {th("childcare","Childcare",78)}{th("statePFL","State PFL",78)}{th("union","Union",65)}
                  <th style={{padding:"10px 14px",fontSize:11,fontWeight:700,letterSpacing:.5,textTransform:"uppercase",color:"#6b7280",background:"#f9fafb"}}>Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p,i)=>{
                  const t=getTier(p.total),active=sel?.id===p.id;
                  const rowBg = active ? "#f0f9ff" : p.verified ? "#f0fdf4" : "#fefce8";
                  return (
                    <tr key={p.id} onClick={()=>setSel(active?null:p)}
                      style={{cursor:"pointer",borderBottom:"1px solid #f3f4f6",background:rowBg}}>
                      <td style={{padding:"10px 14px"}}>
                        <div style={{display:"inline-flex",alignItems:"center",gap:6}}>
                          <div style={{width:8,height:8,borderRadius:2,background:t.dot,flexShrink:0}}/>
                          <span style={{fontWeight:800,fontSize:16,color:t.color}}>{p.total}</span>
                        </div>
                      </td>
                      <td style={{padding:"10px 14px"}}>
                        <div style={{fontWeight:600,color:"#111827"}}>{p.name}</div>
                        <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{p.city}</div>
                      </td>
                      <td style={{padding:"10px 14px"}}>
                        <span style={{background:STATE_PFL.includes(p.state)?"#dbeafe":"#f3f4f6",
                          color:STATE_PFL.includes(p.state)?"#1d4ed8":"#6b7280",
                          padding:"2px 7px",borderRadius:4,fontSize:11,fontWeight:600}}>{p.state}</span>
                      </td>
                      <td style={{padding:"10px 14px",fontSize:12,color:"#4b5563"}}>{p.region}</td>
                      <td style={{padding:"10px 14px",textAlign:"center"}}>
                        <span style={{fontWeight:700,fontSize:14,color:p.paidWeeks>=12?"#059669":p.paidWeeks>=8?"#d97706":"#dc2626"}}>{p.paidWeeks}w</span>
                        <div style={{fontSize:9,marginTop:2,color:p.verified?"#15803d":"#a16207",fontWeight:600,letterSpacing:.2}}>
                          {p.verified ? "✓ verified" : "~ est."}
                        </div>
                      </td>
                      {["genderEquity","formalPolicy","childcare"].map(k=>(
                        <td key={k} style={{padding:"10px 14px",textAlign:"center"}}>
                          <Bar val={p[k]} max={CRITERIA.find(c=>c.key===k).max}/>
                        </td>
                      ))}
                      <td style={{padding:"10px 14px",textAlign:"center"}}>
                        {p.statePFL>0?<span style={{color:"#059669",fontWeight:700}}>✓</span>:<span style={{color:"#d1d5db"}}>—</span>}
                      </td>
                      <td style={{padding:"10px 14px",textAlign:"center"}}>
                        {p.union?<span style={{background:"#fef3c7",color:"#92400e",padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:600}}>Union</span>:<span style={{color:"#d1d5db"}}>—</span>}
                      </td>
                      <td style={{padding:"10px 14px",minWidth:150}}><StackBar p={p}/></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {sel && <Detail p={sel} onClose={()=>setSel(null)}/>}

        <div style={{marginTop:24,background:"white",borderRadius:12,border:"1px solid #e5e7eb",padding:22}}>
          <h3 style={{margin:"0 0 14px",fontSize:14,fontWeight:700,color:"#374151"}}>Scoring Methodology</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:10}}>
            {CRITERIA.map(c=>(
              <div key={c.key} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:12}}>
                <div style={{background:"#1a1a2e",color:"white",borderRadius:4,padding:"2px 7px",fontWeight:700,fontSize:11,whiteSpace:"nowrap",flexShrink:0}}>max {c.max}</div>
                <div><div style={{fontWeight:600,color:"#374151"}}>{c.label}</div><div style={{color:"#6b7280",marginTop:2,lineHeight:1.5}}>{c.desc}</div></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:14,padding:12,background:"#fef9e7",borderRadius:8,fontSize:12,color:"#92400e",lineHeight:1.6}}>
            <strong>Data Transparency:</strong> Paid weeks data is sourced from a curated spreadsheet of publicly documented institutional GME policies (March 2026). Programs not listed in that spreadsheet default to the ACGME-mandated minimum of 6 paid weeks. Row shading indicates data confidence: <span style={{background:"#dcfce7",padding:"1px 5px",borderRadius:3,fontWeight:600,color:"#15803d"}}>green = verified</span> from primary institutional sources; <span style={{background:"#fef9c3",padding:"1px 5px",borderRadius:3,fontWeight:600,color:"#a16207"}}>yellow = estimated</span> (ACGME 6-wk minimum assumed). Always verify directly with program coordinators before making residency decisions.
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({p,onClose}){
  const t=getTier(p.total);
  return (
    <div style={{marginTop:20,background:"white",borderRadius:12,border:"1px solid #bae6fd",boxShadow:"0 4px 20px rgba(56,189,248,.12)",padding:28}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:4}}>
            <div style={{width:12,height:12,borderRadius:3,background:t.dot}}/>
            <h2 style={{margin:0,fontSize:20,fontWeight:800}}>{p.name}</h2>
            <span style={{fontSize:13,color:"#6b7280"}}>{p.city}, {p.state}</span>
            {p.union&&<span style={{background:"#fef3c7",color:"#92400e",padding:"2px 10px",borderRadius:6,fontSize:12,fontWeight:700}}>Unionized</span>}
            <span style={{background:p.verified?"#dcfce7":"#fef9c3",color:p.verified?"#15803d":"#a16207",
              padding:"2px 10px",borderRadius:6,fontSize:12,fontWeight:700}}>
              {p.verified ? "✓ Paid Wks Verified" : "~ Paid Wks Estimated"}
            </span>
          </div>
          <div style={{fontSize:13,color:"#6b7280"}}>{t.label} · {p.region}</div>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:42,fontWeight:900,color:t.color,lineHeight:1}}>{p.total}</div>
            <div style={{fontSize:12,color:"#9ca3af"}}>/ {MAX_TOTAL} pts</div>
          </div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:16,color:"#6b7280"}}>✕</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12,marginBottom:20}}>
        {CRITERIA.map(c=>{
          const v=p[c.key],pct=Math.round((v/c.max)*100);
          const relSrcs=p.sources.map((k,i)=>({k,i})).filter(({k})=>(SOURCE_CRITERIA[k]||[]).includes(c.key));
          return (
            <div key={c.key} style={{background:"#f8fafc",borderRadius:8,padding:14}}>
              <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:"#6b7280",marginBottom:8}}>{c.label}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
                <span style={{fontSize:22,fontWeight:800,color:pct===100?"#059669":pct>=67?"#0284c7":pct>=33?"#d97706":"#dc2626"}}>{v}</span>
                <span style={{fontSize:12,color:"#9ca3af"}}>/ {c.max}</span>
              </div>
              <div style={{height:6,background:"#e5e7eb",borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${pct}%`,borderRadius:3,background:pct===100?"#059669":pct>=67?"#3b82f6":pct>=33?"#f59e0b":"#ef4444"}}/>
              </div>
              <div style={{fontSize:11,color:"#9ca3af",marginTop:6,lineHeight:1.4}}>{c.desc}</div>
              {c.key==="paidWeeksScore"&&(
                <div style={{marginTop:6,fontSize:10,fontWeight:600,color:p.verified?"#15803d":"#a16207"}}>
                  {p.verified ? "✓ verified from primary source" : "~ estimated (ACGME 6-wk min)"}
                </div>
              )}
              {relSrcs.length>0&&(
                <div style={{marginTop:6,display:"flex",gap:3,flexWrap:"wrap"}}>
                  {relSrcs.map(({i})=>(
                    <span key={i} style={{background:"#dbeafe",color:"#1d4ed8",borderRadius:3,padding:"0 5px",fontSize:9,fontWeight:700,lineHeight:"16px"}}>
                      src {i+1}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{background:"#f0f9ff",borderRadius:8,padding:14,borderLeft:"3px solid #38bdf8",marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:"#0284c7",marginBottom:6}}>Assessment Notes</div>
        <p style={{margin:0,fontSize:13,color:"#374151",lineHeight:1.7}}>{p.note}</p>
      </div>

      <div style={{background:"#f9fafb",borderRadius:8,padding:16,border:"1px solid #e5e7eb"}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:"#6b7280",marginBottom:12}}>
          📚 Sources Used ({p.sources.length})
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {p.sources.map((key,i)=>{
            const s=SRC[key];
            if(!s) return null;
            return (
              <div key={key} style={{display:"flex",alignItems:"flex-start",gap:10,fontSize:12}}>
                <span style={{background:"#e5e7eb",color:"#6b7280",borderRadius:4,padding:"1px 6px",fontWeight:700,fontSize:10,flexShrink:0,marginTop:2}}>
                  {i+1}
                </span>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  onClick={e=>e.stopPropagation()}
                  style={{color:"#0284c7",textDecoration:"none",lineHeight:1.5}}>
                  {s.label} <span style={{color:"#94a3b8",fontSize:10}}>↗</span>
                </a>
              </div>
            );
          })}
        </div>
        <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #e5e7eb",fontSize:11,color:"#9ca3af",fontStyle:"italic"}}>
          Last updated March 2026. Paid weeks data sourced from institutional GME policy spreadsheet; unverified programs default to ACGME 6-wk minimum. Contact program coordinators to confirm current policies before making residency decisions.
        </div>
      </div>
    </div>
  );
}

function Bar({val,max}){
  const pct=(val/max)*100;
  const c=pct===100?"#059669":pct>=67?"#3b82f6":pct>=33?"#f59e0b":"#ef4444";
  return <div style={{width:44,height:6,background:"#f3f4f6",borderRadius:3,overflow:"hidden",display:"inline-block"}}><div style={{height:"100%",width:`${pct}%`,background:c,borderRadius:3}}/></div>;
}
function StackBar({p}){
  const colors=["#3b82f6","#10b981","#8b5cf6","#f59e0b","#06b6d4","#f43f5e"];
  const fields=["paidWeeksScore","genderEquity","formalPolicy","childcare","statePFL","noExtReq"];
  return <div style={{height:8,display:"flex",borderRadius:4,overflow:"hidden",gap:1}}>{fields.map((f,i)=><div key={f} style={{flex:p[f],background:colors[i],minWidth:p[f]>0?2:0}}/>)}</div>;
}
