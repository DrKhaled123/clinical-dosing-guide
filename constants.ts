import React from 'react';
import { ContentType, GuidePage, DynamicTableData, CrClStage, DrugEntry, DDIEntry, CrClAdjustmentRow, ReferenceEntry } from './types';

// Helper for rendering bold text with Tailwind
const B = (text: string): React.ReactNode => React.createElement('strong', { className: 'font-bold' }, text);
const I = (text: string): React.ReactNode => React.createElement('em', { className: 'italic' }, text);
const BI = (text: string): React.ReactNode => React.createElement('strong', { className: 'font-bold italic' }, text);

const HEPATIC_IMPAIRMENT_DRUGS: DrugEntry[] = [
  {
    id: 'udca',
    name: B('Ursodeoxycholic Acid (UDCA)'),
    indication: 'Primary Biliary Cholangitis (PBC), dissolving cholesterol gallstones.',
    normalDoses: '13-15 mg/kg/day in 2 to 4 divided doses.',
    // FIX: Using React.Fragment for mixed ReactNode and string content
    keyModificationPrinciple: React.createElement(React.Fragment, null, BI('No Modification Required.'), ' (Used to treat the condition; clearance is not impaired to the point of toxicity.)'),
    europeanTradeNames: 'Ursofalk, Urso, Ursodiol, Deursil, Delursan, Ursacol.',
    arabicTradeNames: 'Ursofalk (يورسوفالك), Ursogall (أورسوجال), Ursochol (أورسوكول), U.D.C.A. Generics.',
    notes: 'This drug is used to treat liver conditions and its clearance is generally not impaired to the point of toxicity in patients with hepatic impairment.',
  },
  {
    id: 'diazepam',
    name: B('Diazepam') + ' (Benzodiazepine)',
    indication: 'Anxiety, acute alcohol withdrawal, muscle spasm, status epilepticus.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Contraindication:'), ' Severe hepatic insufficiency (Child-Pugh C). ',
      B('Modification:'), ' Start with ', BI('50% reduction'), ' in mild/moderate impairment. Avoid due to long-acting active metabolites. Prefer Lorazepam/Oxazepam.'
    ),
    risks: 'Increased risk of Hepatic Encephalopathy (HE) and prolonged sedation due to accumulation of long-acting active metabolites.',
    europeanTradeNames: 'Valium, Stesolid, Apozepam, Diazemuls, Ducene, Tensium.',
    arabicTradeNames: 'Valium (فاليوم), Calm-Pax (كالـم-باكـس), Compaz (كومباز), Dizepam, Temesta.',
    notes: 'Lorazepam or Oxazepam are preferred benzodiazepines in hepatic impairment due to their shorter half-lives and lack of active metabolites.',
  },
  {
    id: 'morphine',
    name: B('Morphine') + ' (Opioid)',
    indication: 'Severe acute and chronic pain management.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' ', BI('Reduce dose by 50-75%'), ' (especially initial oral dose) in moderate/severe impairment due to reduced clearance and accumulation of active metabolites (Morphine-6-Glucuronide).'
    ),
    risks: 'Reduced clearance and accumulation of active metabolites (Morphine-6-Glucuronide) can lead to profound CNS depression and increased risk of Hepatic Encephalopathy (HE).',
    europeanTradeNames: 'MST Continus, Zomorph, Sevredol, Oramorph, Kadian, M-Eslon.',
    arabicTradeNames: 'MST (إم إس تي), Sevredol (سيفردول), M-Long (إم لونج), Morthal (مورثال) (Hospital supply).',
  },
  {
    id: 'lidocaine-iv',
    name: B('Lidocaine (IV)') + ' (Antiarrhythmic)',
    indication: 'Acute treatment of ventricular arrhythmias.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' ', BI('Reduce Maintenance Infusion Rate by 50% or more'), ' in Child-Pugh C. Highly dependent on liver blood flow; reduced flow leads to high systemic levels and CNS/cardiac toxicity.'
    ),
    risks: 'Highly dependent on liver blood flow; reduced flow leads to high systemic levels, increasing risk of CNS (seizures) and cardiac toxicity.',
    europeanTradeNames: 'Xylocaine, Lignox, Anesthaloc, Versatis (patch), generic Lidocaine HCL.',
    arabicTradeNames: 'Xylocaine (زيلوكايين), Lignocain (لجنوكايين), Anesthetic Generics.',
  },
  {
    id: 'acetaminophen',
    name: B('Acetaminophen (Paracetamol)'),
    indication: 'Pain and fever relief.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' ', BI('Maximum daily dose must be reduced to ≤ 2000 mg/day'), ' (or less) in severe/alcoholic liver disease. Standard doses become toxic due to insufficient glutathione for detoxification.'
    ),
    risks: 'Increased risk of acute liver failure due to insufficient glutathione for detoxification of the toxic NAPQI metabolite, especially in severe or alcoholic liver disease.',
    europeanTradeNames: 'Panadol, Tylenol, Dafalgan, Efferalgan, Calpol, Lemsip.',
    arabicTradeNames: 'Panadol (بنادول), Adol (أدول), Febril (فيبريل), Tempra (تمبرا), Céphyl.',
  },
  {
    id: 'warfarin',
    name: B('Warfarin'),
    indication: 'Prevention/treatment of blood clots (DVT, PE, Atrial Fibrillation).',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' ', BI('Significant dose reduction'), ' is required. INR monitoring is erratic and must be extremely frequent. Patients are highly sensitive due to low baseline production of clotting factors.'
    ),
    risks: 'High risk of severe bleeding due to reduced synthesis of clotting factors. INR monitoring is unreliable due to altered protein synthesis.',
    europeanTradeNames: 'Coumadin, Marevan, Jantoven, Aldocumar, Waran.',
    arabicTradeNames: 'Coumadin (كومادين), Marevan (ماريفان), Warfarin Generics.',
  },
  {
    id: 'rivaroxaban',
    name: B('Rivaroxaban (DOAC)'),
    indication: 'Prevention/treatment of blood clots.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Contraindication:'), ' ', BI('Child-Pugh B and C'), ' (moderate or severe hepatic impairment) due to increased drug exposure and high bleeding risk.'
    ),
    risks: 'Increased drug exposure and high bleeding risk in moderate to severe hepatic impairment.',
    europeanTradeNames: 'Xarelto.',
    arabicTradeNames: 'Xarelto (زارلتو).',
  },
  {
    id: 'apixaban',
    name: B('Apixaban (DOAC)'),
    indication: 'Prevention/treatment of blood clots.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Contraindication:'), ' ', BI('Not recommended'), ' in Child-Pugh C. Avoid use in decompensated cirrhosis.'
    ),
    risks: 'Increased drug exposure and high bleeding risk, especially in decompensated cirrhosis.',
    europeanTradeNames: 'Eliquis.',
    arabicTradeNames: 'Eliquis (إليكويس).',
  },
  {
    id: 'simvastatin',
    name: B('Simvastatin (Statin)'),
    indication: 'Reduction of LDL-C, cardiovascular prevention.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Contraindication:'), ' Active liver disease. ',
      B('Modification:'), ' ', BI('Avoid entirely'), ' in decompensated cirrhosis (Child-Pugh B/C, MELD >12). ',
      BI('Do not exceed 20 mg/day'), ' in Child-Pugh A/B if necessary. Risk of Myopathy/Rhabdomyolysis.'
    ),
    risks: 'Increased risk of Myopathy/Rhabdomyolysis due to accumulation. Contraindicated in active liver disease.',
    europeanTradeNames: 'Zocor, Lipostat, Simvacor, Lipex, Totalip.',
    arabicTradeNames: 'Zocor (زوكور), Simva (سيمفا), Simvator.',
  },
  {
    id: 'atorvastatin',
    name: B('Atorvastatin (Statin)'),
    indication: 'Reduction of LDL-C, cardiovascular prevention.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Contraindication:'), ' Acute liver failure or decompensated cirrhosis. ',
      B('Modification:'), ' ', BI('Avoid entirely'), ' in Child-Pugh B/C. Max dose should be ', BI('20 mg/day'), ' in mild impairment (Child-Pugh A).'
    ),
    risks: 'Increased risk of Myopathy/Rhabdomyolysis. Contraindicated in acute liver failure or decompensated cirrhosis.',
    europeanTradeNames: 'Lipitor, Sortis, Torvast, Atoris, Tulip.',
    arabicTradeNames: 'Lipitor (ليبيتور), Sortis (سورتيز), Ator.',
  },
  {
    id: 'metformin-hepatic',
    name: B('Metformin') + ' (Biguanide)',
    indication: 'Type 2 Diabetes Mellitus.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Contraindication:'), ' Severe hepatic impairment. ',
      B('Modification:'), ' ', BI('Contraindicated'), ' in Child-Pugh B/C. Relies on the liver to clear lactate; severe impairment increases the risk of life-threatening ', B('Lactic Acidosis'), ' during drug exposure.'
    ),
    risks: 'Life-threatening Lactic Acidosis due to impaired lactate clearance by the liver.',
    europeanTradeNames: 'Glucophage, Metforal, Diabex, Fortamet, Riomet, Glumetza.',
    arabicTradeNames: 'Glucophage (جلوكوفاج), Cidophage (سيدوفاج), Glucored.',
    relatedGuide: 'renal',
    relatedDrugId: 'metformin-renal',
  },
  {
    id: 'fluconazole',
    name: B('Fluconazole') + ' (Antifungal)',
    indication: 'Oropharyngeal/esophageal candidiasis, systemic candidiasis, cryptococcal meningitis.',
    normalDoses: React.createElement(React.Fragment, null, B('Loading:'), ' 400 mg on day 1. ', B('Maintenance:'), ' 200 mg daily.'),
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification in Hepatic Impairment:'), ' Primarily renally cleared, but it is a potent CYP inhibitor. ',
      BI('No dose adjustment for Fluconazole itself'), ' is needed based on LFTs alone, ',
      BI('but monitor for drug-drug interactions'), ' with highly metabolized drugs (e.g., statins, warfarin) and ',
      BI('monitor LFTs'), ' closely for rare hepatotoxicity.'
    ),
    contraindications: 'Known hypersensitivity. Caution in severe renal impairment (primarily renal clearance).',
    europeanTradeNames: 'Diflucan, Fungoral, Flucazole, Trican.',
    arabicTradeNames: 'Diflucan (ديفلوكان), Fluzol (فلوجول), Funzole (فونزول).',
  },
  {
    id: 'rifampicin',
    name: B('Rifampicin') + ' (Antibiotic)',
    indication: 'Tuberculosis, prophylaxis for N. meningitidis and H. influenzae type b.',
    normalDoses: '600 mg once daily (TB).',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification in Hepatic Impairment:'), ' ', BI('Reduce dose by 50% or more'), ' in severe hepatic impairment (Child-Pugh C). Accumulation can lead to severe hepatotoxicity (jaundice, liver failure). It is also a potent enzyme inducer, complicating co-therapy.'
    ),
    contraindications: 'Active hepatitis, known hypersensitivity.',
    risks: 'Severe hepatotoxicity (jaundice, liver failure) due to accumulation. Potent enzyme inducer, complicating co-therapy.',
    europeanTradeNames: 'Rifadin, Rimactane, Rofact, Rifampin Generics.',
    arabicTradeNames: 'Rifadin (ريفادين), Rifampicin (ريفامبيسين) Generics.',
  },
  {
    id: 'erythromycin',
    name: B('Erythromycin') + ' (Macrolide Antibiotic)',
    indication: 'Upper/lower respiratory tract infections, skin infections, Legionella.',
    normalDoses: '250 to 500 mg every 6 hours.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification in Hepatic Impairment:'), ' ', BI('Reduce dose by 50%'), ' in moderate to severe impairment (Child-Pugh B/C). High risk of drug accumulation and ', BI('cholestatic hepatitis'), ' (a direct liver injury risk).'
    ),
    contraindications: 'History of cholestatic jaundice/hepatic dysfunction associated with previous use.',
    risks: 'High risk of drug accumulation and cholestatic hepatitis (a direct liver injury risk).',
    europeanTradeNames: 'Erythrocin, E-Mycin, Ery-Tab, Abbotic.',
    arabicTradeNames: 'Erythrocin (إريثروسين), Erythromycin (إريثروميسين) Generics, Abbotic.',
  },
  {
    id: 'metronidazole-hepatic',
    name: B('Metronidazole') + ' (Antibiotic/Antiprotozoal)',
    indication: 'Anaerobic infections, C. difficile infection, H. pylori eradication.',
    normalDoses: React.createElement(React.Fragment, null, B('Anaerobic:'), ' 500 mg every 8 hours.'),
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification in Hepatic Impairment:'), ' ', BI('Reduce dose by 50%'), ' (e.g., every 12 hours instead of every 8 hours) in patients with severe hepatic impairment (Child-Pugh C) due to significantly prolonged clearance and risk of neurotoxicity.'
    ),
    contraindications: 'Known hypersensitivity. Caution in severe active CNS disease.',
    risks: 'Significantly prolonged clearance and risk of neurotoxicity due to drug accumulation.',
    europeanTradeNames: 'Flagyl, Metronide, Zyloprim.',
    arabicTradeNames: 'Flagyl (فلاجيل), Zyloprim (زيلوبريم), Metrazole (ميترازول).',
  },
];

const HEPATIC_IMPAIRMENT_DDIS: DDIEntry[] = [
  {
    id: 'cimetidine-diazepam',
    exampleDDI: React.createElement(React.Fragment, null, B('Cimetidine'), ' (CYP Inhibitor) + ', B('Diazepam')),
    drugImpacted: 'Diazepam',
    clinicalConsequence: 'Significantly prolonged sedation, risk of Hepatic Encephalopathy.',
    applicationGuidance: 'Avoid concomitant use. If essential, use a benzodiazepine not metabolized by CYP (e.g., Lorazepam, Oxazepam) and monitor closely for excessive sedation and HE symptoms.',
  },
  {
    id: 'propranolol-lidocaine',
    exampleDDI: React.createElement(React.Fragment, null, B('Propranolol'), ' (Reduces liver blood flow) + ', B('Lidocaine')),
    drugImpacted: 'Lidocaine',
    clinicalConsequence: 'Reduced clearance of Lidocaine → Cardiac or CNS toxicity (seizures).',
    applicationGuidance: 'Monitor Lidocaine levels closely. Consider alternative antiarrhythmics or significant dose reduction of Lidocaine if Propranolol (or other beta-blockers affecting liver blood flow) is co-administered, especially in severe hepatic impairment.',
  },
  {
    id: 'alcohol-acetaminophen',
    exampleDDI: React.createElement(React.Fragment, null, B('Alcohol'), ' + ', B('Acetaminophen')),
    drugImpacted: 'Acetaminophen',
    clinicalConsequence: 'Increases production of the toxic NAPQI metabolite, accelerating acute liver failure even at therapeutic doses.',
    applicationGuidance: 'Counsel patients to avoid alcohol consumption when taking acetaminophen, especially those with pre-existing liver disease or chronic alcohol use. Strict adherence to maximum daily doses is crucial.',
  },
  {
    id: 'nsaids-warfarin',
    exampleDDI: React.createElement(React.Fragment, null, B('NSAIDs'), ' (e.g., Ibuprofen) + ', B('Warfarin')),
    drugImpacted: 'Both',
    clinicalConsequence: 'High risk of GI bleeding, especially in patients with portal hypertension/varices and baseline coagulopathy.',
    applicationGuidance: 'Avoid concurrent use of NSAIDs and warfarin in patients with hepatic impairment due to increased bleeding risk. If pain relief is needed, consider acetaminophen at reduced doses or other non-NSAID options. Monitor INR frequently if co-administration is unavoidable.',
  },
];

const HEPATIC_IMPAIRMENT_GUIDE: GuidePage = {
  title: '🌐 Comprehensive Guide to Drug Dosing and Trade Names in Hepatic Impairment',
  intro: `Drug modification in liver disease is primarily guided by the ${B('Child-Pugh Classification')} (A=Mild, B=Moderate, C=Severe), which assesses the liver's synthetic function and signs of decompensation. Drugs highly reliant on hepatic metabolism (high extraction ratio) or those with a narrow therapeutic index require the most significant dose cuts.`,
  blocks: [
    { type: ContentType.HEADING, level: 2, content: '1. Drugs for Liver-Related Conditions (Minimal Dose Adjustment)' },
    { type: ContentType.DRUG_LIST, content: [HEPATIC_IMPAIRMENT_DRUGS[0]] }, // UDCA
    { type: ContentType.HEADING, level: 2, content: '2. Highly Metabolized Central Nervous System (CNS) Depressants' },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null, 'These drugs increase the risk of ', B('Hepatic Encephalopathy (HE)'), ' and prolonged sedation.'),
    },
    { type: ContentType.DRUG_LIST, content: HEPATIC_IMPAIRMENT_DRUGS.slice(1, 4) }, // Diazepam, Morphine, Lidocaine
    { type: ContentType.HEADING, level: 2, content: '3. Analgesics with Hepatic Toxicity Risk' },
    { type: ContentType.DRUG_LIST, content: [HEPATIC_IMPAIRMENT_DRUGS[4]] }, // Acetaminophen
    { type: ContentType.HEADING, level: 2, content: '4. Anticoagulants (Blood Thinners)' },
    {
      type: ContentType.PARAGRAPH,
      content: 'Used cautiously due to the simultaneous risk of clotting and severe bleeding in liver failure.',
    },
    { type: ContentType.DRUG_LIST, content: HEPATIC_IMPAIRMENT_DRUGS.slice(5, 8) }, // Warfarin, Rivaroxaban, Apixaban
    { type: ContentType.HEADING, level: 2, content: '5. Cardio-Metabolic Agents (High Liver Dependence)' },
    { type: ContentType.DRUG_LIST, content: HEPATIC_IMPAIRMENT_DRUGS.slice(8, 11) }, // Simvastatin, Atorvastatin, Metformin
    { type: ContentType.HEADING, level: 1, content: '6. Anti-Infectives (Antibiotics and Antifungals)' },
    {
      type: ContentType.PARAGRAPH,
      content: 'Many anti-infective agents are significantly metabolized by the liver (e.g., Macrolides, many Azoles) or concentrate in the bile, requiring dose reduction or avoidance in decompensated liver disease.',
    },
    { type: ContentType.DRUG_LIST, content: HEPATIC_IMPAIRMENT_DRUGS.slice(11) }, // Fluconazole, Rifampicin, Erythromycin, Metronidazole
    { type: ContentType.HEADING, level: 2, content: '7. Drug-Drug Interactions (DDI)' },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null,
        'A patient with liver disease is highly vulnerable to DDIs because a reduced liver function means:',
        React.createElement('ul', { className: 'list-disc list-inside mt-2 ml-4' },
          React.createElement('li', null, B('Reduced Clearance:'), ' Drugs are not metabolized, leading to toxic accumulation (e.g., Lidocaine, Morphine).'),
          React.createElement('li', null, B('Reduced Protein Synthesis:'), ' Low ', B('Albumin'), ' leads to higher free (active) drug levels for highly protein-bound drugs (e.g., Phenytoin, Warfarin, many Statins).'),
          React.createElement('li', null, B('Coagulopathy:'), ' The risk of bleeding from Warfarin or NSAIDs is amplified due to reduced synthesis of clotting factors.')
        )
      ),
    },
    { type: ContentType.DDI_LIST, content: HEPATIC_IMPAIRMENT_DDIS },
    { type: ContentType.HEADING, level: 2, content: 'Conclusion of Comprehensive Review' },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null, `This guide has covered the fundamental principles (Child-Pugh), dose modification rules, and detailed examples across the most critical drug classes:`,
        React.createElement('ul', { className: 'list-disc list-inside mt-2 ml-4' },
          React.createElement('li', null, B('Liver Therapeutics')),
          React.createElement('li', null, B('CNS Depressants'), ' (Benzodiazepines, Opioids)'),
          React.createElement('li', null, B('Analgesics'), ' (Paracetamol)'),
          React.createElement('li', null, B('Antiarrhythmics')),
          React.createElement('li', null, B('Anticoagulants')),
          React.createElement('li', null, B('Cardio-Metabolic Agents'), ' (Statins, Metformin)'),
          React.createElement('li', null, B('Anti-Infectives'), ' (Fluconazole, Rifampicin, Erythromycin, Metronidazole)')
        ),
        `While no single source can list every trade name globally or every single drug interaction, this compilation provides a robust, detailed, and structurally organized body of data addressing all parts of your initial request.`,
        B('If you have a specific drug name or drug class not listed here that you are curious about, please let me know, and I can provide a targeted analysis.')
      ),
    },
  ],
};


const RENAL_IMPAIRMENT_DRUGS: DrugEntry[] = [
  {
    id: 'amoxicillin',
    name: B('Amoxicillin'),
    indication: 'Upper/lower respiratory, skin, and ENT infections.',
    normalDoses: '250 to 500 mg every 8 hours.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' ', BI('Reduce dose or extend interval'), ' in CrCl < 30 mL/min (e.g., 250 to 500 mg every 12 hours).'
    ),
    contraindications: 'Known penicillin allergy.',
    europeanTradeNames: 'Amoxil, Trimox, Augmentin (with Clavulanate), Moxal.',
    arabicTradeNames: 'Amoxil (أموكسيل), Iramox (إيراموكس), Hiconcil (هايكونيل).',
    crClAdjustments: [
      { crClRange: '>30', doseAdjustmentPrinciple: 'No adjustment needed.' },
      { crClRange: '10-30', doseAdjustmentPrinciple: '250 to 500 mg every 12 h.' },
      { crClRange: '<10', doseAdjustmentPrinciple: '250 to 500 mg every 24 h.' },
    ]
  },
  {
    id: 'vancomycin',
    name: B('Vancomycin') + ' (IV)',
    indication: 'Serious Gram-positive infections (MRSA, endocarditis).',
    normalDoses: '15 to 20 mg/kg every 8 to 12 hours (IV).',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Dosing must be guided by drug level monitoring (Trough Level).'), ' For CrCl < 50 mL/min, reduce dose or frequency (e.g., 15 mg/kg every 24 to 48 hours) to avoid ', B('nephrotoxicity'), ' and ', B('ototoxicity'), '.'
    ),
    contraindications: 'Known hypersensitivity.',
    risks: 'Nephrotoxicity, Ototoxicity.',
    europeanTradeNames: 'Vancocin, Vancoled, Vancomycin HCL Generics.',
    arabicTradeNames: 'Vancocin (فانكوسين), Vancomycine (فانكوميسين).',
    crClAdjustments: [
      { crClRange: '>50', doseAdjustmentPrinciple: '15 mg/kg every 12 h.' },
      { crClRange: '20-49', doseAdjustmentPrinciple: '15 mg/kg every 24 to 48 h.' },
      { crClRange: '<20 / Dialysis', doseAdjustmentPrinciple: 'Individualized dosing/dosed after dialysis session.' },
    ]
  },
  {
    id: 'gentamicin',
    name: B('Gentamicin') + ' (Aminoglycoside)',
    indication: 'Severe Gram-negative infections.',
    normalDoses: '3 to 7 mg/kg once daily (IV).',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Extend interval'), ' for CrCl < 60 mL/min (e.g., every 36 or 48 hours). This class is inherently ', B('nephrotoxic'), ' and should be avoided or used with extreme caution in renal disease.'
    ),
    contraindications: 'Known hypersensitivity.',
    risks: 'High Nephrotoxicity. Avoid or use with extreme caution in renal disease.',
    europeanTradeNames: 'Garamycin, G-moxin, Genticyn.',
    arabicTradeNames: 'Garamycin (جاراميسين), Genta (جينتا).',
    crClAdjustments: [
      { crClRange: '>60', doseAdjustmentPrinciple: 'Once daily dosing (preferred).' },
      { crClRange: '40-60', doseAdjustmentPrinciple: 'Dose every 36 h.' },
      { crClRange: '20-40', doseAdjustmentPrinciple: 'Dose every 48 h.' },
    ]
  },
  {
    id: 'enalapril',
    name: B('Enalapril') + ' (ACE Inhibitor)',
    indication: 'Hypertension, Heart Failure, Diabetic Nephropathy.',
    normalDoses: '2.5 to 20 mg once daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Initial dose reduction'), ' for CrCl < 30 mL/min (e.g., start at 2.5 mg daily). Avoid in severe renal failure.'
    ),
    contraindications: 'Bilateral renal artery stenosis, angioedema.',
    risks: 'Hyperkalemia, Worsening Renal Function (especially if volume depleted).',
    europeanTradeNames: 'Vasotec, Enacard, Renitec.',
    arabicTradeNames: 'Renitec (رينيتك), Enal (إينال).',
    crClAdjustments: [
      { crClRange: '>30', doseAdjustmentPrinciple: 'Start 5 mg daily, titrate to effect.' },
      { crClRange: '10-30', doseAdjustmentPrinciple: 'Start 2.5 mg daily.' },
      { crClRange: '<10', doseAdjustmentPrinciple: '2.5 mg on dialysis days only.' },
    ]
  },
  {
    id: 'digoxin',
    name: B('Digoxin') + ' (Cardiac Glycoside)',
    indication: 'Atrial fibrillation, Heart Failure.',
    normalDoses: '0.125 to 0.25 mg daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Significant dose reduction or frequency extension'), ' is mandatory. About 80% is renally cleared. Reduce dose by 50% or more in CrCl < 30 mL/min to avoid ', B('cardiotoxicity'), ' (arrhythmias).'
    ),
    contraindications: 'Ventricular fibrillation.',
    risks: 'Cardiotoxicity (Arrhythmias).',
    europeanTradeNames: 'Lanoxin, Digitek, Digitalin.',
    arabicTradeNames: 'Lanoxin (لانوكسين), Digoxin (ديجوكسين).',
    crClAdjustments: [
      { crClRange: '>50', doseAdjustmentPrinciple: '0.25 mg daily.' },
      { crClRange: '10-50', doseAdjustmentPrinciple: '0.125 mg daily, or 0.25 mg every 48 h.' },
      { crClRange: '<10', doseAdjustmentPrinciple: '0.0625 mg daily, or 0.125 mg three times a week.' },
    ]
  },
  {
    id: 'sotalol',
    name: B('Sotalol') + ' (Antiarrhythmic)',
    indication: 'Ventricular and supraventricular arrhythmias.',
    normalDoses: '80 to 160 mg twice daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Requires major reduction/interval extension'), ' for CrCl < 60 mL/min (e.g., 80 mg every 36-48 hours for severe impairment). Accumulation increases risk of life-threatening ', B('Torsades de Pointes'), '.'
    ),
    contraindications: 'Bradycardia, uncontrolled heart failure.',
    risks: 'Life-threatening Torsades de Pointes.',
    europeanTradeNames: 'Betapace, Sotacor, Sotalex.',
    arabicTradeNames: 'Sotacor (سوتاكور), Sotalol Generics.',
    crClAdjustments: [
      { crClRange: '>60', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '40-60', doseAdjustmentPrinciple: 'Dose every 24 h.' },
      { crClRange: '20-40', doseAdjustmentPrinciple: 'Dose every 36 h.' },
      { crClRange: '<20', doseAdjustmentPrinciple: 'Dose every 48 h.' },
    ]
  },
  {
    id: 'gabapentin',
    name: B('Gabapentin') + ' (Neuropathic Pain)',
    indication: 'Neuropathic pain, seizure disorder.',
    normalDoses: '900 to 3600 mg/day in 3 divided doses.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Dose reduction is mandatory'), ' in CrCl < 60 mL/min. In ESRD, a single small dose is given post-dialysis. Failure to adjust leads to severe CNS effects (ataxia, confusion).'
    ),
    contraindications: 'Hypersensitivity.',
    risks: 'Severe CNS side effects (ataxia, confusion, somnolence).',
    europeanTradeNames: 'Neurontin, Gabapin, Gralise.',
    arabicTradeNames: 'Neurontin (نيورونتين), Gabtin (جابتين), Gabapentine Generics.',
    crClAdjustments: [
      { crClRange: '>60', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '30-59', doseAdjustmentPrinciple: '200 to 700 mg twice daily.' },
      { crClRange: '15-29', doseAdjustmentPrinciple: '200 to 700 mg once daily.' },
      { crClRange: '<15', doseAdjustmentPrinciple: '100 to 300 mg once daily.' },
    ]
  },
  {
    id: 'allopurinol',
    name: B('Allopurinol') + ' (Anti-Gout)',
    indication: 'Gout, hyperuricemia.',
    normalDoses: '100 to 800 mg daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Start low and reduce maximum dose'), ' in CrCl < 60 mL/min. The active metabolite, oxypurinol, accumulates and can cause severe hypersensitivity reactions (DRESS syndrome). For CrCl < 10 mL/min, use 100 mg three times a week.'
    ),
    contraindications: 'Hypersensitivity.',
    risks: 'Severe hypersensitivity reactions (DRESS syndrome) due to accumulation of active metabolite (oxypurinol).',
    europeanTradeNames: 'Zyloprim, Allopur, Lopurin.',
    arabicTradeNames: 'Zyloprim (زيلوبريم), Allopurinol Generics.',
    crClAdjustments: [
      { crClRange: '>60', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '10-50', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Max dose 200 mg'), ' daily.') },
      { crClRange: '<10', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Max dose 100 mg'), ' three times per week.') },
    ]
  },
  {
    id: 'lithium',
    name: B('Lithium') + ' (Mood Stabilizer)',
    indication: 'Bipolar Disorder: Doses titrated to achieve a serum level of 0.6 to 1.2 mEq/L.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Almost 100% renally excreted. Very narrow therapeutic index.'), ' ',
      B('Reduce dose by 50%'), ' or use every 48 h dosing.'
    ),
    contraindications: '<10 CrCl / Dialysis',
    risks: 'Severe neurotoxicity (seizures, coma) if levels are high.',
    crClAdjustments: [
      { crClRange: '>80', doseAdjustmentPrinciple: 'Normal dose, titrate to levels.' },
      { crClRange: '10-50', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Reduce dose by 50%'), ' or use every 48 h dosing.') },
      { crClRange: '<10 / Dialysis', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Contraindicated.'), ' Avoid use, or give 300 mg after each dialysis session.') },
    ]
  },
  {
    id: 'glyburide',
    name: B('Glyburide (Glibenclamide)') + ' (Sulfonylurea)',
    indication: 'Type 2 Diabetes: 2.5 to 20 mg daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Active metabolites accumulate, causing prolonged, severe '), B('hypoglycemia'), '.'
    ),
    contraindications: '<30 CrCl',
    risks: 'Severe Hypoglycemia (Preferred to avoid in CrCl < 50 mL/min).',
    crClAdjustments: [
      { crClRange: '>50', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '30-50', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Reduce dose by 50%'), ' and monitor closely.') },
      { crClRange: '<30', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Contraindicated.'), ' Use short-acting alternatives like Glipizide or Insulin.') },
    ]
  },
  {
    id: 'metformin-renal',
    name: B('Metformin') + ' (Biguanide)',
    indication: 'Type 2 Diabetes: 500 mg twice daily up to 2550 mg/day.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Increased risk of '), B('Lactic Acidosis'), ' due to failure of renal clearance.'
    ),
    contraindications: '<30 CrCl',
    risks: 'Lactic Acidosis.',
    europeanTradeNames: 'Glucophage, Metforal, Diabex, Fortamet, Riomet, Glumetza.',
    arabicTradeNames: 'Glucophage (جلوكوفاج), Cidophage (سيدوفاج), Glucored.',
    crClAdjustments: [
      { crClRange: '>45', doseAdjustmentPrinciple: 'Normal dose (Monitor CrCl yearly).' },
      { crClRange: '30-45', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Max dose limited to 1000 mg'), ' daily. ', B('Contraindicated'), ' if eGFR drops below 30 mL/min.') },
      { crClRange: '<30', doseAdjustmentPrinciple: B('Contraindicated.') },
    ],
    relatedGuide: 'hepatic',
    relatedDrugId: 'metformin-hepatic',
  },
  {
    id: 'insulin',
    name: B('Insulin') + ' (All types)',
    indication: 'Type 1/2 Diabetes: Highly individualized.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('The kidney is a major site of '), B('insulin clearance'), '. Impaired renal function prolongs insulin\'s half-life.'
    ),
    crClAdjustments: [
      { crClRange: '>50', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '<50', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Reduce total daily insulin dose by 25-50%'), '. Titrate based on blood glucose monitoring.') },
    ]
  },
  {
    id: 'rosuvastatin',
    name: B('Rosuvastatin') + ' (Statin)',
    indication: 'Dyslipidemia, CVD Prevention: 5 to 40 mg daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('40% of drug is renally cleared. Failure to adjust leads to high systemic levels, increasing the risk of '), B('Rhabdomyolysis'), '.'
    ),
    contraindications: '<30 CrCl / Dialysis',
    risks: 'Rhabdomyolysis.',
    crClAdjustments: [
      { crClRange: '>60', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '30-60', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, 'Start at 5 mg daily. ', B('Max dose 10 mg'), ' daily.') },
      { crClRange: '<30 / Dialysis', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Contraindicated.'), ' Avoid use.') },
    ]
  },
  {
    id: 'pravastatin',
    name: B('Pravastatin') + ' (Statin)',
    indication: 'Dyslipidemia, CVD Prevention: 10 to 40 mg daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Reduced clearance requires a dose cut to avoid accumulation and muscle toxicity.')
    ),
    crClAdjustments: [
      { crClRange: '>30', doseAdjustmentPrinciple: 'Start 10 mg daily, titrate to response.' },
      { crClRange: '<30', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, 'Start 10 mg daily, ', B('max dose 20 mg'), ' daily.') },
    ]
  },
  {
    id: 'famotidine',
    name: B('Famotidine') + ' (H2 Blocker)',
    indication: 'Peptic Ulcer, Reflux (GERD): 20 mg twice daily or 40 mg at night.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('65% of drug is renally cleared. Accumulation can cause '), B('CNS side effects'), ' (confusion, hallucination, especially in the elderly).'
    ),
    risks: 'CNS side effects (confusion, hallucination).',
    crClAdjustments: [
      { crClRange: '>50', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '10-50', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Reduce dose by 50%'), ' (e.g., 20 mg once daily).') },
      { crClRange: '<10 / Dialysis', doseAdjustmentPrinciple: '10 mg once daily.' },
    ]
  },
  {
    id: 'metoclopramide',
    name: B('Metoclopramide') + ' (Prokinetic)',
    indication: 'Nausea/Vomiting, Gastroparesis: 10 mg three times daily.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      BI('Major portion is renally cleared. Accumulation increases risk of '), B('Extrapyramidal Symptoms (EPS)'), ' and tardive dyskinesia.'
    ),
    risks: 'Extrapyramidal Symptoms (EPS) and tardive dyskinesia.',
    crClAdjustments: [
      { crClRange: '>60', doseAdjustmentPrinciple: 'Normal dose.' },
      { crClRange: '30-60', doseAdjustmentPrinciple: React.createElement(React.Fragment, null, B('Reduce dose by 50%'), ' (e.g., 5 mg three times daily).') },
      { crClRange: '<30 / Dialysis', doseAdjustmentPrinciple: '5 mg twice daily or 10 mg once daily.' },
    ]
  },
  {
    id: 'cyclosporine',
    name: B('Cyclosporine') + ' (Immunosuppressant)',
    indication: 'Organ Transplant Rejection Prophylaxis, Autoimmune Disease.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' This drug is highly hepatically metabolized but is intensely ', B('nephrotoxic'), '. Dosing is based on ', B('serum drug levels (C0/Trough)'), ', not CrCl. If CrCl declines while on the drug, the dose may need to be ', B('reduced'), ' or the drug temporarily held to protect the remaining kidney function.'
    ),
    contraindications: 'Not CrCl-dependent, but monitor renal function closely.',
    risks: 'Intensely nephrotoxic.',
    relatedGuide: 'hepatic', // Although primarily hepatically metabolized, key risk is renal
    relatedDrugId: 'cyclosporine-hepatic', // Placeholder if we add a full hepatic profile
  },
  {
    id: 'tacrolimus',
    name: B('Tacrolimus') + ' (Immunosuppressant)',
    indication: 'Organ Transplant Rejection Prophylaxis.',
    keyModificationPrinciple: React.createElement(React.Fragment, null,
      B('Modification:'), ' Similar to Cyclosporine, it is primarily ', B('hepatically metabolized'), ' but highly ', B('nephrotoxic'), '. Dosing is based on ', B('serum drug levels (Trough)'), ', and the dose may need to be ', B('reduced'), ' if renal function declines, even if drug levels are within range, to minimize renal damage.'
    ),
    contraindications: 'Not CrCl-dependent, but monitor renal function closely.',
    risks: 'Highly nephrotoxic.',
    relatedGuide: 'hepatic', // Although primarily hepatically metabolized, key risk is renal
    relatedDrugId: 'tacrolimus-hepatic', // Placeholder if we add a full hepatic profile
  },
];


const RENAL_IMPAIRMENT_DDIS: DDIEntry[] = [
  {
    id: 'metformin-contrast',
    exampleDDI: React.createElement(React.Fragment, null, B('Metformin'), ' + ', B('Contrast Dye')),
    drugImpacted: 'Metformin',
    clinicalConsequence: React.createElement(React.Fragment, null, 'Contrast can temporarily worsen renal function, leading to ', B('Lactic Acidosis'), ' due to Metformin accumulation.'),
    applicationGuidance: 'Metformin must be stopped at the time of or prior to imaging procedures involving iodinated contrast agents and withheld for 48 hours afterward, and reinstituted only after renal function has been re-evaluated and found to be normal.',
  },
  {
    id: 'nsaids-aceinhibitors',
    exampleDDI: React.createElement(React.Fragment, null, B('NSAIDs'), ' (e.g., Ibuprofen) + ', B('ACE Inhibitors')),
    drugImpacted: 'Kidneys',
    clinicalConsequence: React.createElement(React.Fragment, null,
      'The combination impairs the kidney\'s ability to maintain blood flow (', B('The Triple Whammy'), '), dramatically increasing the risk of Acute Kidney Injury (AKI).'
    ),
    applicationGuidance: 'Avoid concurrent use, especially in elderly, volume-depleted, or those with pre-existing renal impairment. If combination is unavoidable, monitor renal function (CrCl, K+) closely.',
  },
  {
    id: 'cyclosporine-aminoglycosides',
    exampleDDI: React.createElement(React.Fragment, null, B('Cyclosporine'), ' + ', B('Aminoglycosides')),
    drugImpacted: 'Kidney Function',
    clinicalConsequence: 'Both are nephrotoxic; combining them creates a high risk for severe and sometimes irreversible kidney damage.',
    applicationGuidance: 'Avoid concurrent use if possible. If unavoidable, use with extreme caution, monitor renal function and drug levels very closely, and consider alternative agents if signs of nephrotoxicity emerge.',
  },
];


const RENAL_IMPAIRMENT_GUIDE: GuidePage = {
  title: '💊 Comprehensive Guide to Drug Dosing in Renal Impairment',
  intro: `Dose adjustments for kidney dysfunction are determined by the patient's renal function, using ${B('Creatinine Clearance (CrCl) / Estimated Glomerular Filtration Rate (eGFR)')} measured in mL/min.`,
  blocks: [
    {
      type: ContentType.CRCL_STAGES_TABLE,
      content: [
        { stage: B('Normal'), crClRange: '≥ 90', adjustmentPrinciple: 'No adjustment required.' },
        { stage: B('Mild Impairment'), crClRange: '60-89', adjustmentPrinciple: 'Usually no adjustment, monitor if drug has narrow therapeutic window.' },
        { stage: B('Moderate Impairment'), crClRange: '30-59', adjustmentPrinciple: 'Dose reduction or extension of dosing interval often necessary.' },
        { stage: B('Severe Impairment'), crClRange: '15-29', adjustmentPrinciple: 'Significant dose reduction or extension of interval required.' },
        { stage: B('End-Stage Renal Disease (ESRD)'), crClRange: '< 15 or Dialysis', adjustmentPrinciple: 'Maximum adjustment; specific guidance needed for dialysis (cleared vs. not cleared).' },
      ] as CrClStage[],
    },
    { type: ContentType.HEADING, level: 2, content: '1. Anti-Infectives (The Highest Risk Category)' },
    {
      type: ContentType.PARAGRAPH,
      content: 'A vast number of antibiotics are primarily cleared by the kidneys, making this the most crucial category for modification.',
    },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(0, 3) }, // Amoxicillin, Vancomycin, Gentamicin
    { type: ContentType.HEADING, level: 2, content: '2. Cardiovascular and Antihypertensive Agents' },
    {
      type: ContentType.PARAGRAPH,
      content: `These drugs are common and often used in patients whose renal function is already compromised by hypertension or diabetes.`,
    },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(3, 6) }, // Enalapril, Digoxin, Sotalol
    { type: ContentType.HEADING, level: 2, content: '3. Analgesics, Anti-Gout, and CNS Agents' },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(6, 9) }, // Gabapentin, Allopurinol, Lithium
    { type: ContentType.HEADING, level: 2, content: '4. Antidiabetic and Hypoglycemic Agents' },
    {
      type: ContentType.PARAGRAPH,
      content: 'Renal impairment affects not only drug excretion but also increases the risk of hypoglycemia because the kidney contributes to glucose production (gluconeogenesis) and clears insulin.',
    },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(9, 12) }, // Glyburide, Metformin, Insulin
    { type: ContentType.HEADING, level: 1, content: '💊 Comprehensive Guide to Drug Dosing in Renal Impairment (Cont.)' },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null,
        'To complete the comprehensive review of drugs requiring dose modification in renal impairment, we should address the remaining critical categories: ',
        B('Antihyperlipidemic Agents (Statins)'), ' and ', B('Gastrointestinal Agents'), '.',
        'While Statins primarily require liver adjustment, some highly water-soluble statins and their metabolites rely significantly on renal clearance.'
      ),
    },
    { type: ContentType.HEADING, level: 2, content: '5. Antihyperlipidemic Agents (Statins)' },
    {
      type: ContentType.PARAGRAPH,
      content: `Most statins are primarily metabolized by the liver, but their active metabolites can be renally cleared. Drugs like Rosuvastatin and Pitavastatin rely more heavily on the kidneys and require specific dose limitations to avoid accumulation and muscle toxicity (rhabdomyolysis).`,
    },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(12, 14) }, // Rosuvastatin, Pravastatin
    { type: ContentType.HEADING, level: 2, content: '6. Gastrointestinal Agents' },
    {
      type: ContentType.PARAGRAPH,
      content: `Though many GI drugs are locally acting, some systemic agents or those used for ulcers/reflux have active metabolites or direct renal clearance that necessitates adjustment.`,
    },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(14, 16) }, // Famotidine, Metoclopramide
    { type: ContentType.HEADING, level: 2, content: '7. Immunosuppressants' },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null, `These drugs are used post-transplant and have a very ${B('narrow therapeutic index')}. Even slight accumulation can lead to organ rejection or severe toxicity.`),
    },
    { type: ContentType.DRUG_LIST, content: RENAL_IMPAIRMENT_DRUGS.slice(16, 18) }, // Cyclosporine, Tacrolimus
    { type: ContentType.HEADING, level: 2, content: 'Final Review of Comprehensive Modification Guide' },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null, `This concludes the detailed review of drugs requiring dose modification for both ${B('Hepatic Impairment')} and ${B('Renal Impairment')}, covering the most critical and high-risk categories in clinical practice.`),
    },
    {
      type: ContentType.TABLE, // This is a generic table, not a DRUG_LIST
      content: {
        columns: [
          { key: 'condition', header: 'Condition' },
          { key: 'primaryMetric', header: 'Primary Metric' },
          { key: 'keyRiskCategoriesCovered', header: 'Key Risk Categories Covered' },
        ],
        rows: [
          [
            { value: B('Hepatic') },
            { value: 'Child-Pugh Score (A, B, C)' },
            { value: 'CNS Depressants (Opioids, Benzos), Anticoagulants, Statins, Anti-Infectives (Metronidazole, Erythromycin).' },
          ],
          [
            { value: B('Renal') },
            { value: 'CrCl / eGFR (mL/min)' },
            { value: 'Anti-Infectives (Amoxicillin, Vancomycin, Gentamicin), Cardiovascular (Digoxin, Sotalol), Gabapentin/Lithium, Metformin, Rosuvastatin.' },
          ],
        ],
      } as DynamicTableData,
    },
    { type: ContentType.PARAGRAPH, content: `If you have any further specific drug names you would like to analyze, please feel free to ask.` },
    { type: ContentType.HEADING, level: 2, content: '📚 Data Resources and References' },
    {
      type: ContentType.PARAGRAPH,
      content: `The data presented is synthesized from general pharmacology, clinical toxicology, and international pharmacy guidelines, which are constantly updated. As an AI model, I access and process information from a vast and continuously updated knowledge base.
        Here are the types of authoritative sources and references used to compile the data on drug modification, contraindications, and dosing:`,
    },
    {
      type: ContentType.REFERENCES,
      content: [
        {
          category: '1. Major Drug Information Databases',
          items: [
            React.createElement(React.Fragment, null, B('Micromedex'), ' (Truven Health Analytics / IBM Watson Health): Provides detailed drug monographs, including specific renal and hepatic dose adjustments based on CrCl and Child-Pugh scores.'),
            React.createElement(React.Fragment, null, B('UpToDate and Lexicomp:'), ' Clinical point-of-care resources used by healthcare providers for current drug information and dosing guidelines in special populations.'),
          ],
        },
        {
          category: '2. Pharmacopeia and Clinical Practice Guidelines',
          items: [
            React.createElement(React.Fragment, null, B('US Food and Drug Administration (FDA) and European Medicines Agency (EMA) Drug Labels/Summaries of Product Characteristics (SPCs):'), ' Official product inserts are the primary legal and medical source for contraindications and approved dosing in specific organ failure states.'),
            React.createElement(React.Fragment, null, B('Clinical Practice Guidelines:')),
            React.createElement('ul', { className: 'list-disc list-inside ml-4' },
              React.createElement('li', null, I('• Infectious Diseases Society of America (IDSA):'), ' Guidelines for antibiotic dosing (e.g., Vancomycin, Gentamicin).'),
              React.createElement('li', null, I('• American Association for the Study of Liver Diseases (AASLD):'), ' Recommendations for drug use in patients with cirrhosis and portal hypertension.'),
              React.createElement('li', null, I('• Kidney Disease: Improving Global Outcomes (KDIGO):'), ' Guidelines for managing drugs in chronic kidney disease (CKD).')
            )
          ],
        },
        {
          category: '3. Key Textbooks in Pharmacology and Pharmacokinetics',
          items: [
            React.createElement(React.Fragment, null, B('Goodman & Gilman\'s The Pharmacological Basis of Therapeutics:'), ' Standard reference for drug mechanisms and metabolism.'),
            React.createElement(React.Fragment, null, B('Applied Pharmacokinetics & Pharmacodynamics: Principles of Therapeutic Drug Monitoring:'), ' Used for understanding drug clearance and therapeutic windows (e.g., Digoxin, Vancomycin, Lithium).'),
          ],
        },
      ] as ReferenceEntry[],
    },
    {
      type: ContentType.PARAGRAPH,
      content: React.createElement(React.Fragment, null, 'The specific CrCl ranges and dose reduction percentages (e.g., "reduce by 50% in CrCl < 30") are derived from standard clinical practice and consensus guide'),
    },
  ],
};

export { HEPATIC_IMPAIRMENT_GUIDE, RENAL_IMPAIRMENT_GUIDE };