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
  MA_PFL:        { label:"MA Paid Family & Medical Leave (PFML)",             url:"https://www.mass.gov/info-details/paid-family-and-medical-leave-pfml-overview" },
  WA_PFL:        { label:"WA Paid Family & Medical Leave",                    url:"https://paidleave.wa.gov/" },
  OR_PFL:        { label:"OR Paid Leave Oregon (eff. Sep 2023)",              url:"https://paidleave.oregon.gov/" },
  CO_PFL:        { label:"CO FAMLI Program (eff. Jan 2024)",                  url:"https://famli.colorado.gov/" },
  CT_PFL:        { label:"CT Paid Leave Authority",                           url:"https://ctpaidleave.org/" },
  MN_PFL:        { label:"MN Paid Family & Medical Leave (eff. Jan 2026)",    url:"https://www.dli.mn.gov/paid-leave" },
  DC_PFL:        { label:"DC Paid Family Leave Program",                      url:"https://does.dc.gov/page/dc-paid-family-leave" },
  RI_TCI:        { label:"RI Temporary Caregiver Insurance (TCI)",            url:"https://dlt.ri.gov/individuals/temporary-disability-caregiver-insurance/temporary-caregiver-insurance" },
  MD_PFL:        { label:"MD Time to Care Act / FAMLI (eff. 2026)",           url:"https://www.dllr.state.md.us/paidleave/" },
  CIR_CONTRACT:  { label:"Committee of Interns & Residents (CIR/SEIU) Contracts", url:"https://www.cirseiu.org/contracts/" },
  MGH_POLICY:    { label:"MGH House Staff Manual — Parental Leave",           url:"https://www.massgeneral.org/graduate-medical-education/policies" },
  COLUMBIA_GME:  { label:"Columbia Surgery — Plastic Surgery Residency",      url:"https://columbiasurgery.org/education-training/plastic-surgery-residency-program" },
  NYU_GME:       { label:"NYU Langone — Plastic Surgery Residency",           url:"https://med.nyu.edu/departments-institutes/plastic-reconstructive-surgery/education-training/residency-program" },
  YALE_GME:      { label:"Yale School of Medicine GME Office Policies",       url:"https://medicine.yale.edu/gme/policies/" },
  DUKE_GME:      { label:"Duke GME Housestaff Benefits & Leave Policy",       url:"https://gme.duke.edu/housestaff-benefits" },
  VUMC_GME:      { label:"Vanderbilt GME Resident Parental Leave Policy",     url:"https://www.vumc.org/gme/parental-leave" },
  JHU_RES:       { label:"Johns Hopkins/Univ of Maryland Plastic Surgery Residency", url:"https://www.hopkinsmedicine.org/plastic-reconstructive-surgery/education/residency-programs" },
  NORTHWESTERN_POLICY:{ label:"Northwestern Surgery Parental Leave Policy (2020)", url:"https://www.surgery.northwestern.edu/docs/gs-policies/parental-family-leave-policy-2020.pdf" },
  UCLA_GME:      { label:"UCLA GME Resident Parental Leave Policies",         url:"https://medschool.ucla.edu/gme/resident-resources" },
  STANFORD_GME:  { label:"Stanford GME Resident Benefits",                    url:"https://med.stanford.edu/gme/current-residents-fellows/benefits.html" },
  UCSD_GME:      { label:"UC San Diego Graduate Medical Education",           url:"https://medschool.ucsd.edu/som/gme/Pages/default.aspx" },
  UW_GME:        { label:"University of Washington GME Resident Benefits",    url:"https://uwmedicine.org/education/graduate-medical-education" },
  OHSU_GME:      { label:"OHSU Plastic Surgery Residency Program",            url:"https://www.ohsu.edu/school-of-medicine/surgery/plastic-surgery-residency-program" },
  CO_GME:        { label:"Univ. of Colorado Peripartum Residency Policy (APSAPS 2023)", url:"https://apsapedsurg.org/wp-content/uploads/2023/04/Colorado-Residency-Peripartum-Policy.pdf" },
  UMICH_GME:     { label:"University of Michigan House Officers Association",  url:"https://hr.umich.edu/benefits-wellness/health/medical/housestaff" },
  MUSC_RES:      { label:"MUSC Plastic Surgery Residency Program",            url:"https://medicine.musc.edu/departments/surgery/education/residencies/plastic-surgery-integrated-residency-program" },
  PENN_STATE_RES:{ label:"Penn State Plastic Surgery Residency",              url:"https://med.psu.edu/residencies-fellowships/professional-programs/plastic-surgery-residency" },
  UCHICAGO_GME:  { label:"University of Chicago Medicine GME Policies",       url:"https://pritzker.uchicago.edu/page/graduate-medical-education" },
  WUSM_GME:      { label:"Washington Univ. in St. Louis / BJC Plastic Surgery", url:"https://surgery.wustl.edu/education/residency-programs/plastic-surgery/" },
  UMN_GME:       { label:"University of Minnesota GME Leave Policies",        url:"https://med.umn.edu/education/graduate-medical-education/current-residents-fellows/benefits" },
  HUMPHRIES_2016:{ label:"Humphries & Park, PRS Glob Open 2016 — Parental Leave in Plastic Surgery", url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC4956880/" },
  CARRION_2025:  { label:"Carrion et al., PRS Glob Open 2025 — Program Director Attitudes", url:"https://pubmed.ncbi.nlm.nih.gov/40321323/" },
  UCSF_RES:      { label:"UCSF Plastic Surgery — ABPS Leave Policy Reference", url:"https://surgeryresidentportal.ucsf.edu/guidelines-family-leave-surgical-trainees" },
};

const PROGRAMS = [
  { id:1, name:"Harvard/MGH", city:"Boston", state:"MA", region:"Northeast", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"SEIU/CIR union contract guarantees 12 wks fully paid leave; MGH house staff manual documents equal leave for birth and non-birth parents, adoption, and foster care; MA PFML provides additional state wage replacement.",
    sources:["CIR_CONTRACT","MGH_POLICY","MA_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:2, name:"Harvard/Brigham & Women's", city:"Boston", state:"MA", region:"Northeast", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"CIR/SEIU union-backed; equal leave for all genders and family formations; BWH GME policy publicly documented; MA PFML provides additional state supplement; on-site childcare at Longwood campus.",
    sources:["CIR_CONTRACT","MA_PFL","ACGME_BLOG","KASEMODEL_2022","GODBE_2025"] },
  { id:3, name:"Columbia/Weill Cornell", city:"New York", state:"NY", region:"Northeast", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"CIR union contract covers both NYP campuses; 12 wks paid in house staff agreement; NY PFL adds state supplement at 67% wages for 12 weeks; on-site childcare at NYP.",
    sources:["CIR_CONTRACT","COLUMBIA_GME","NY_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:4, name:"NYU Langone", city:"New York", state:"NY", region:"Northeast", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"CIR/SEIU union contract; 12 wks paid leave; formal written policy in house staff agreement; on-site childcare at Bellevue/NYU campus; NY PFL supplements; Godbe et al. 2025 classifies NYU as unionized with above-average parental leave.",
    sources:["CIR_CONTRACT","NYU_GME","NY_PFL","GODBE_2025","KASEMODEL_2022"] },
  { id:5, name:"Yale School of Medicine", city:"New Haven", state:"CT", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"Yale GME office publishes leave policy (8 wks 100% paid); CT Paid Leave Authority (eff. 2022) provides 12 wks at 60% wages supplementing institutional leave; on-site childcare at Yale-New Haven campus.",
    sources:["YALE_GME","CT_PFL","ACGME_BLOG","FREIDA","KASEMODEL_2022"] },
  { id:6, name:"Brown/Rhode Island Hospital", city:"Providence", state:"RI", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:7, statePFL:5, noExtReq:10,
    note:"Brown GME provides ~8 wks institutional leave; RI Temporary Caregiver Insurance adds ~6 wks at 60% wages; formal policy exists in GME handbook but not fully public; subsidized childcare referral through Brown campus.",
    sources:["RI_TCI","FREIDA","ACGME_BLOG","HUMPHRIES_2016","GODBE_2025"] },
  { id:7, name:"Boston University", city:"Boston", state:"MA", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:7, statePFL:10, noExtReq:10,
    note:"BU GME provides ~8 wks paid institutional leave; MA PFML supplements with up to 12 wks at 80% wages; GME policy is documented but less comprehensive publicly than unionized peers; campus childcare subsidized.",
    sources:["MA_PFL","FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016"] },
  { id:8, name:"UConn Health", city:"Farmington", state:"CT", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:4, statePFL:10, noExtReq:10,
    note:"UConn as a state institution provides ~8 wks paid leave; CT Paid Leave Authority supplements with 12 wks at 60% wages; limited on-site childcare; policy in GME handbook but limited public transparency.",
    sources:["CT_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:9, name:"Icahn/Mount Sinai", city:"New York", state:"NY", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:10, statePFL:10, noExtReq:10,
    note:"Mount Sinai GME provides ~8 wks paid leave; NY PFL supplements at 67% wages for 12 wks; on-site childcare available at main campus; GME policy documented but not as comprehensive as unionized NYC programs.",
    sources:["NY_PFL","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:10, name:"University of Pennsylvania", city:"Philadelphia", state:"PA", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:7, statePFL:0, noExtReq:10,
    note:"Penn Medicine GME has a strong, publicly documented 8-wk parental leave policy with equity provisions; PA has no state PFL; subsidized childcare available through Penn Benefits; FREIDA confirms leave details.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022","ACS_STMT"] },
  { id:11, name:"Johns Hopkins/Univ of Maryland", city:"Baltimore", state:"MD", region:"Northeast", union:true,
    paidWeeks:10, genderEquity:20, formalPolicy:15, childcare:10, statePFL:5, noExtReq:10,
    note:"JHU house staff unionized; JHH residency page and GME policies document 10 wks paid leave; MD Time to Care/FAMLI launched 2026 providing additional state supplement; on-site childcare at JHH.",
    sources:["JHU_RES","CIR_CONTRACT","MD_PFL","ACGME_BLOG","GODBE_2025"] },
  { id:12, name:"Georgetown/MedStar", city:"Washington", state:"DC", region:"Northeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:7, statePFL:10, noExtReq:10,
    note:"MedStar GME provides ~8 wks paid leave; DC Paid Family Leave (12 wks) substantially supplements; policy in GME handbook but detailed public documentation limited; subsidized childcare available.",
    sources:["DC_PFL","FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016"] },
  { id:13, name:"Penn State/Hershey", city:"Hershey", state:"PA", region:"Northeast", union:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"Penn State Hershey program page confirms ACGME compliance; PA has no state PFL; GME policy meets 6-wk ACGME minimum; limited childcare at Hershey campus; FREIDA database listing.",
    sources:["PENN_STATE_RES","FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:14, name:"Thomas Jefferson University", city:"Philadelphia", state:"PA", region:"Northeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"PA has no state PFL; meets ACGME minimum of 6 wks; no formal written parental leave policy found publicly on program or GME website; limited childcare resources; FREIDA listing confirms ACGME compliance only.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:15, name:"SUNY Downstate", city:"Brooklyn", state:"NY", region:"Northeast", union:true,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:4, statePFL:10, noExtReq:5,
    note:"CIR union affiliation; NY PFL supplements institutional leave at 67% wages for 12 wks; smaller program with 6-wk institutional policy; Godbe et al. 2025 classifies as unionized; limited childcare on site.",
    sources:["CIR_CONTRACT","NY_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:16, name:"Albany Medical Center", city:"Albany", state:"NY", region:"Northeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:10, noExtReq:5,
    note:"NY PFL available as state supplement; ACGME minimum 6 wks met; no formal written parental leave policy found on program website or GME page; no dedicated on-site childcare identified; FREIDA listing only.",
    sources:["NY_PFL","FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:17, name:"Duke University", city:"Durham", state:"NC", region:"Southeast", union:false,
    paidWeeks:8, genderEquity:20, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"Duke GME publishes a comprehensive parental leave policy online with 8 wks paid, explicit gender-equity language, coverage for birth, adoption, and foster care; on-site childcare at Duke campus; NC has no state PFL.",
    sources:["DUKE_GME","FREIDA","ACGME_BLOG","KASEMODEL_2022","ACS_STMT"] },
  { id:18, name:"Emory University", city:"Atlanta", state:"GA", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Emory GME policy meets ACGME 6-wk minimum; GA has no state PFL; subsidized childcare referral available through Emory benefits; policy documented in GME handbook but limited public detail.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:19, name:"UNC Chapel Hill", city:"Chapel Hill", state:"NC", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"State institution; UNC GME policy meets ACGME 6-wk minimum with gender-equity language; NC has no state PFL; UNC campus childcare center available to residents; Godbe et al. 2025 cites NC programs.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","CARRION_2025"] },
  { id:20, name:"University of Florida", city:"Gainesville", state:"FL", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"FL has no state PFL; ACGME minimum met; formal parental leave policy not publicly documented on UF GME or plastic surgery program pages; limited childcare; Humphries & Park 2016 noted FL programs as among those lacking formal policies.",
    sources:["FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE","CARRION_2025"] },
  { id:21, name:"University of Miami", city:"Miami", state:"FL", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"FL has no state PFL; UM Health GME documents a 6-wk parental leave policy; no on-site childcare at Jackson Memorial site; FREIDA listing confirms ACGME compliance; policy exists in GME handbook.",
    sources:["FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE","GODBE_2025"] },
  { id:22, name:"Vanderbilt University", city:"Nashville", state:"TN", region:"Southeast", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:7, statePFL:0, noExtReq:10,
    note:"VUMC GME publishes a strong parental leave policy with 8 wks paid; TN has no state PFL; subsidized childcare through Vanderbilt benefits; Godbe et al. 2025 identifies VUMC as having above-average institutional policy.",
    sources:["VUMC_GME","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:23, name:"Wake Forest/Atrium Health", city:"Winston-Salem", state:"NC", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"NC has no state PFL; meets ACGME 6-wk minimum; no formal written parental leave policy found on Wake Forest GME or Atrium Health website; no dedicated on-site childcare identified; FREIDA listing only.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:24, name:"MUSC", city:"Charleston", state:"SC", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"MUSC residency program page confirms ACGME accreditation and compliance; SC has no state PFL; GME policy documented internally; limited childcare infrastructure; MUSC program page and FREIDA database consulted.",
    sources:["MUSC_RES","FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:25, name:"University of Virginia", city:"Charlottesville", state:"VA", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"VA has no broad state PFL (state workers-only program is limited); UVA GME standard parental leave policy meets ACGME minimum; subsidized childcare available at UVA facilities through housestaff benefits.",
    sources:["FREIDA","ACGME_BLOG","HUMPHRIES_2016","ABPS_LEAVE","GODBE_2025"] },
  { id:26, name:"UAB", city:"Birmingham", state:"AL", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"AL has no state PFL; ACGME minimum only; no formal written parental leave policy found publicly on UAB GME or plastic surgery program pages; no dedicated on-site childcare; FREIDA listing only.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:27, name:"University of Mississippi", city:"Jackson", state:"MS", region:"Southeast", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"MS has no state PFL; UMC program overview confirms ACGME accreditation; no formal parental leave policy found publicly; limited institutional support for childcare documented; FREIDA and program website consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:28, name:"University of Michigan", city:"Ann Arbor", state:"MI", region:"Midwest", union:true,
    paidWeeks:10, genderEquity:20, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"U-M House Officers Association (HOA) union contract; 10 wks paid leave negotiated in collective bargaining; comprehensive gender-equity provisions; on-site childcare at U-M Health; Godbe et al. 2025 lists U-M as unionized with above-average parental leave.",
    sources:["UMICH_GME","CIR_CONTRACT","FREIDA","GODBE_2025","ACGME_BLOG"] },
  { id:29, name:"Northwestern University", city:"Chicago", state:"IL", region:"Midwest", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"Northwestern GME published parental leave policy (2020) provides 6 wks childrearing leave at 100% salary plus additional options; IL has no state PFL; Lurie Children's on-site childcare adjacent; policy publicly available.",
    sources:["NORTHWESTERN_POLICY","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:30, name:"University of Chicago", city:"Chicago", state:"IL", region:"Midwest", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:10, statePFL:0, noExtReq:10,
    note:"UChicago Medicine GME publishes an 8-wk paid parental leave policy; Humphries & Park 2016 authored from UChicago Division of Plastic Surgery, reflecting institutional engagement with this issue; on-site childcare available.",
    sources:["UCHICAGO_GME","FREIDA","HUMPHRIES_2016","ACGME_BLOG","GODBE_2025"] },
  { id:31, name:"Washington Univ St. Louis", city:"St. Louis", state:"MO", region:"Midwest", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:7, statePFL:0, noExtReq:10,
    note:"BJC/WUSM GME provides 8 wks paid parental leave; formal written policy documented; MO has no state PFL; subsidized childcare through BJC Benefits; FREIDA database and WUSM program page consulted.",
    sources:["WUSM_GME","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:32, name:"Ohio State University", city:"Columbus", state:"OH", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"OSU Wexner Medical Center GME provides 6-wk parental leave with equity language; OH has no state PFL; campus childcare referral available through OSU benefits; FREIDA and OSU GME handbook consulted.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:33, name:"Case Western/MetroHealth", city:"Cleveland", state:"OH", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:5,
    note:"OH has no state PFL; ACGME minimum met; policy documented but limited public transparency; limited childcare; FREIDA database and Godbe et al. 2025 data on OH programs consulted.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:34, name:"University of Minnesota", city:"Minneapolis", state:"MN", region:"Midwest", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:15, childcare:7, statePFL:5, noExtReq:10,
    note:"UMN GME documents 8-wk paid parental leave policy; MN Paid Family & Medical Leave Act launched January 2026 providing partial state supplement; M Health Fairview campus childcare; formal policy publicly accessible.",
    sources:["UMN_GME","MN_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:35, name:"Indiana University", city:"Indianapolis", state:"IN", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"IN has no state PFL; meets ACGME 6-wk minimum; limited formal policy documentation found publicly; limited childcare resources; FREIDA database and Carrion et al. 2025 on program director attitudes consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:36, name:"Henry Ford Hospital", city:"Detroit", state:"MI", region:"Midwest", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"Henry Ford Health System GME provides ~8 wks paid leave; MI has no state PFL; formal policy in GME handbook; childcare referral through Henry Ford benefits; FREIDA database consulted.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:37, name:"Loyola University", city:"Chicago", state:"IL", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"IL has no state PFL; Stritch GME meets ACGME 6-wk minimum; limited formal policy documentation on public-facing GME website; limited childcare; FREIDA listing and Carrion et al. 2025 consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:38, name:"SIU School of Medicine", city:"Springfield", state:"IL", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"IL has no state PFL; state institution meeting ACGME 6-wk minimum; limited documentation on SIU residency page; no dedicated on-site childcare found; SIU program page and FREIDA database consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:39, name:"University of Wisconsin", city:"Madison", state:"WI", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"WI has no state PFL; UW Health GME 6-wk policy with equity language; state campus childcare available through UW facilities; FREIDA database and Godbe et al. 2025 consulted.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:40, name:"University of Kansas", city:"Kansas City", state:"KS", region:"Midwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:0, statePFL:0, noExtReq:5,
    note:"KS has no state PFL; ACGME minimum met; no formal parental leave policy found on public GME or program pages; no dedicated on-site childcare identified; FREIDA listing only.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:41, name:"UT Southwestern", city:"Dallas", state:"TX", region:"Southwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:8, childcare:4, statePFL:0, noExtReq:10,
    note:"TX has no state PFL; UTSW GME documents a parental leave policy meeting ACGME minimum; formal policy in GME handbook; limited childcare at Parkland/UTSW campus; Godbe et al. 2025 and FREIDA consulted.",
    sources:["FREIDA","ACGME_BLOG","GODBE_2025","HUMPHRIES_2016","ABPS_LEAVE"] },
  { id:42, name:"Baylor College of Medicine", city:"Houston", state:"TX", region:"Southwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"TX has no state PFL; meets ACGME 6-wk minimum; limited formal parental leave policy transparency on public-facing GME website; limited childcare; FREIDA and Carrion et al. 2025 on program director attitudes consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:43, name:"UTHealth Houston", city:"Houston", state:"TX", region:"Southwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"TX has no state PFL; ACGME minimum compliant; no formal written parental leave policy found publicly on UTHealth GME or program pages; FREIDA listing only; ABPS personal leave policy is the applicable baseline.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:44, name:"University of Arizona", city:"Tucson", state:"AZ", region:"Southwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"AZ has no state PFL; Banner-UA GME meets ACGME standard; no formal written parental leave policy found on public-facing pages; limited childcare; FREIDA database and ABPS leave policy baseline consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:45, name:"University of New Mexico", city:"Albuquerque", state:"NM", region:"Southwest", union:false,
    paidWeeks:6, genderEquity:10, formalPolicy:3, childcare:4, statePFL:0, noExtReq:5,
    note:"NM has no state PFL; state institution meeting ACGME minimum; limited documentation on public GME website; limited childcare resources; FREIDA listing and ABPS baseline policy consulted.",
    sources:["FREIDA","ACGME_BLOG","ABPS_LEAVE","HUMPHRIES_2016","CARRION_2025"] },
  { id:46, name:"UCSF", city:"San Francisco", state:"CA", region:"West", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:15, statePFL:10, noExtReq:10,
    note:"CIR union contract; UCSF leads nationally with 12 wks 100% paid for all parents; UCSF Surgery Resident Portal publicly documents plastic surgery-specific family leave guidelines aligned with ABPS; on-site and subsidized childcare; CA PFL supplements up to 8 wks at 60-70% wages.",
    sources:["UCSF_PORTAL","UCSF_RES","CIR_CONTRACT","CA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:47, name:"UCLA", city:"Los Angeles", state:"CA", region:"West", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:15, statePFL:10, noExtReq:10,
    note:"CIR union contract covers UCLA Health; 12 wks paid leave; on-site childcare at WLA campus through UCLA Childcare Centers; CA PFL supplements; UCLA GME policies publicly documented; Godbe et al. 2025 classifies UCLA as unionized with leading benefits.",
    sources:["UCLA_GME","CIR_CONTRACT","CA_PFL","GODBE_2025","KASEMODEL_2022","ACGME_BLOG"] },
  { id:48, name:"Stanford University", city:"Stanford", state:"CA", region:"West", union:false,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:15, statePFL:10, noExtReq:10,
    note:"Stanford GME exceeds ACGME minimums even without union: 12 wks paid documented in Stanford GME Benefits webpage; CA PFL supplements; on-site childcare at Lucile Packard and Stanford facilities; comprehensive, publicly documented policy.",
    sources:["STANFORD_GME","CA_PFL","FREIDA","KASEMODEL_2022","ACGME_BLOG","GODBE_2025"] },
  { id:49, name:"UC San Diego", city:"San Diego", state:"CA", region:"West", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"CIR union contract; UC system GME 12 wks paid for all parents; CA PFL supplements; on-site childcare at UCSD Health campus; UCSD GME publicly documents leave policies; Godbe et al. 2025 identifies UCSD as unionized.",
    sources:["UCSD_GME","CIR_CONTRACT","CA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:50, name:"USC Keck", city:"Los Angeles", state:"CA", region:"West", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:7, statePFL:10, noExtReq:10,
    note:"CA PFL supplements USC institutional 8-wk policy; USC Keck GME policy documented in GME handbook; subsidized childcare referral through USC benefits; non-union but CA PFL provides meaningful state supplement.",
    sources:["CA_PFL","FREIDA","ACGME_BLOG","GODBE_2025","KASEMODEL_2022"] },
  { id:51, name:"UC Davis", city:"Sacramento", state:"CA", region:"West", union:true,
    paidWeeks:10, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"CIR union contract; UC system policy; 10 wks paid via collective bargaining; CA PFL supplements; on-site childcare at UC Davis Health; comprehensive equity provisions; Godbe et al. 2025 classifies UC Davis as unionized.",
    sources:["CIR_CONTRACT","CA_PFL","FREIDA","GODBE_2025","ACGME_BLOG"] },
  { id:52, name:"University of Washington", city:"Seattle", state:"WA", region:"West", union:true,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"UW Medicine housestaff unionized; 12 wks paid via collective bargaining; WA Paid Family & Medical Leave provides up to 12 wks at 70-90% wages as supplement; on-site childcare at UW Medical Center; Godbe et al. 2025 cites UW as leading program.",
    sources:["UW_GME","CIR_CONTRACT","WA_PFL","GODBE_2025","ACGME_BLOG"] },
  { id:53, name:"OHSU", city:"Portland", state:"OR", region:"West", union:false,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:10, statePFL:10, noExtReq:10,
    note:"OR Paid Leave Oregon launched September 2023 providing up to 12 wks at up to 100% wages for lower earners; OHSU GME policy documents strong parental leave; OHSU program page confirms accreditation and policies; on-site childcare at main campus.",
    sources:["OHSU_GME","OR_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:54, name:"University of Colorado", city:"Aurora", state:"CO", region:"West", union:false,
    paidWeeks:12, genderEquity:20, formalPolicy:15, childcare:7, statePFL:10, noExtReq:10,
    note:"CO FAMLI program launched January 2024 providing up to 12 wks at 90% wages; UCHealth/Anschutz GME published peripartum residency policy (APSAPS 2023) provides comprehensive parental leave with equity provisions; subsidized childcare through CU Benefits.",
    sources:["CO_GME","CO_PFL","FREIDA","ACGME_BLOG","GODBE_2025"] },
  { id:55, name:"University of Hawaii", city:"Honolulu", state:"HI", region:"West", union:false,
    paidWeeks:8, genderEquity:15, formalPolicy:8, childcare:7, statePFL:0, noExtReq:10,
    note:"HI has no state PFL program; UH GME provides ~8 wks paid institutional leave; policy in GME handbook; subsidized childcare available through UH system; FREIDA database and ACS statement on surgical trainee leave consulted.",
    sources:["FREIDA","ACGME_BLOG","ACS_STMT","ABPS_LEAVE","HUMPHRIES_2016"] },
];

const withScores = PROGRAMS.map(p => {
  const paidWeeksScore = p.paidWeeks>=12?30:p.paidWeeks>=10?24:p.paidWeeks>=8?20:15;
  const total = paidWeeksScore + p.genderEquity + p.formalPolicy + p.childcare + p.statePFL + p.noExtReq;
  return { ...p, paidWeeksScore, total };
});

const TIERS = [
  { label:"Tier 1 — Exceptional", min:85, color:"#059669", dot:"#10b981" },
  { label:"Tier 2 — Strong",      min:70, color:"#0284c7", dot:"#3b82f6" },
  { label:"Tier 3 — Adequate",    min:55, color:"#d97706", dot:"#f59e0b" },
  { label:"Tier 4 — Minimal",     min:0,  color:"#dc2626", dot:"#ef4444" },
];
function getTier(s){ return TIERS.find(t=>s>=t.min)||TIERS[3]; }

const CRITERIA = [
  { key:"paidWeeksScore", label:"Paid Leave Duration",    max:30, desc:"Weeks of 100% paid institutional parental leave" },
  { key:"genderEquity",   label:"Gender & Family Equity", max:20, desc:"Equal leave for all genders, adoption, foster care" },
  { key:"formalPolicy",   label:"Formal Written Policy",  max:15, desc:"Transparency of publicly documented policy" },
  { key:"childcare",      label:"Childcare Support",      max:15, desc:"On-site, subsidized, and backup childcare" },
  { key:"statePFL",       label:"State PFL Supplement",   max:10, desc:"State-mandated paid family leave program" },
  { key:"noExtReq",       label:"No Extension Required",  max:10, desc:"Flexibility without mandatory training extension" },
];

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
            {[{v:55,l:"Programs"},{v:`${avg}/100`,l:"Avg Score"},{v:t1,l:"Tier 1"},{v:`+${uA-nA}pts`,l:"Union Advantage"}].map(s=>(
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
              <span style={{color:"#9ca3af"}}>— {t.label.split("—")[1]} ({t.min===0?"<55":`≥${t.min}`}pts)</span>
            </div>
          ))}
          <div style={{marginLeft:"auto",fontSize:11,color:"#9ca3af"}}>⚠ Click any row for sources · Verify with programs directly</div>
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
                  return (
                    <tr key={p.id} onClick={()=>setSel(active?null:p)}
                      style={{cursor:"pointer",borderBottom:"1px solid #f3f4f6",
                        background:active?"#f0f9ff":i%2===0?"white":"#fafafa"}}>
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
            <strong>Data Transparency:</strong> Parental leave data is not universally disclosed publicly. Scores are estimated from per-program sources listed in each program's detail panel. Always verify directly with program coordinators.
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
          </div>
          <div style={{fontSize:13,color:"#6b7280"}}>{t.label} · {p.region}</div>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:42,fontWeight:900,color:t.color,lineHeight:1}}>{p.total}</div>
            <div style={{fontSize:12,color:"#9ca3af"}}>/ 100 pts</div>
          </div>
          <button onClick={onClose} style={{background:"#f3f4f6",border:"none",borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:16,color:"#6b7280"}}>✕</button>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12,marginBottom:20}}>
        {CRITERIA.map(c=>{
          const v=p[c.key],pct=Math.round((v/c.max)*100);
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
          Last updated March 2026. Scores estimated from sources above. Contact program coordinators to confirm current policies before making residency decisions.
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
