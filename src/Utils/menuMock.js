const menuMock = [
    {label: 'Therapies', slug:'diabetes-therapies', id: '00',
      submenu: [
        {label: 'DPP-4 Therapy Center', slug: 'dpp-4'},
        {label: 'GLP-1 Agonist', slug: 'glp-1'},
        {label: 'SGLT-2', slug:'sglt-2'},
        {label: 'Bromocriptine-QR (Cycloset)', slug:'bromocriptine-mesylate-cycloset'},
        {label: 'Blood Glucose Control', slug:'blood-glucose-control'},
        {label: 'Diet & Nutrition', slug:'diet-nutrition'},
        {label: 'Insulin', slug:'insulin'},
        {label: 'Metformin', slug:'metformin'},
        {label: 'Sulfonylurea', slug:'sulfonylurea'},
  //       {label: 'See All Therapies', slug:},
        ]
    },
    {
    label: 'Conditions', slug:'conditions', id: '01',
      submenu: [
        {label: 'Alzheimer\\’s', slug: 'alzheimers'},
        {label: 'Gestational Diabetes', slug: 'gestational-diabetes'},
        {label: 'MODY/LADA', slug: 'mody-lada'},
        {label: 'Obesity', slug: 'obesity'},
        {label: 'Prediabetes', slug: 'prediabetes'},
        { label: 'Type 1 Diabetes', slug: 'type-1'},
        { label: 'Type 2 Diabetes', slug: 'type-2'},
      ]
    },
    {
    label: 'Conditions', slug: 'specialties', id: '02',
      submenu: [
        {label: 'Cardiology', slug: 'cardiology'},
        {label: 'Gastroenterology', slug: 'gastroenterology'},
        {label: 'Nephrology', slug: 'nephrology'},
        {label: 'Neuropathy & Pain', slug: 'neuropathy-pain'},
        {label: 'Ophthalmology', slug: 'ophthalmology'},
        {label: 'Periodontal', slug: 'periodontal'},
        {label: 'Podiatry', slug: 'podiatry'},
      ]
  },
    {
    label: 'Newsletter', slug: 'serie', id: '03',
      submenu: [
        {label: 'Main Newsletter Archive', slug: 'main-series/'},
        {label: 'Mastery Series Archive', slug: 'mastery-series/'},
        {label: 'Therapy Series Archive', slug: 'therapy-series/'},
    ]},
    { label: 'For Your Practice', slug: 'for-your-practice', id: '04',
      submenu: [
        {label: 'CME', slug: 'cme'},
        {label: 'Clinician Mobile Apps', slug: 'clinician-mobile-apps'},
        {label: 'For Your Patients', slug: 'for-your-patients'},
        {label: 'Practice Management', slug: 'practice-management'},
        {label: 'Prevention', slug: 'prevention'},
        {label: 'Safety', slug: 'safety'},
      ]},
    {
    label: 'Resources', slug: 'for-your-practice', id: '05',
      submenu: [
        {label: 'Featured Writers', slug: 'featured-writers'},
        {label: 'Articles', slug: 'diabetes-articles'},
        {label: 'Clinical Gems', slug: 'clinical-gems'},
        {label: 'Clinical Presentations', slug: 'clinical-presentations'},
        {label: 'Disasters Averted', slug: 'disasters-averted'},
        {label: 'Exclusive Interviews', slug: 'exclusive-interviews'},
        {label: 'Treatment Stories', slug: 'kol-insights-and-patient-treatment-stories'},
        {label: 'Products', slug: 'diabetes-products'},
        {label: 'Test Your Knowledge', slug: 'test-your-knowledge'},
        {label: 'Videos', slug: 'videos-diabetes-education'},
      ]
    },
  ];

export default menuMock;
