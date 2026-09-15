/* Shared content for the portfolio and its project detail pages. */
const portfolio = {
  skills: ['Human-Centered Design', 'Python', 'Computer Vision', 'Embedded Systems', 'CAD & Prototyping'],
  projects: [
    {
      id: 'verbasense', title: 'Verbasense', shortTitle: 'Verbasense',
      category: 'AI-Powered', filters: ['AI-Powered', 'Embedded Systems'],
      context: 'Student team project', role: 'Product development',
      status: 'Working demo', outcome: 'Making classroom confusion easier to express.',
      summary: 'A classroom feedback system that helps students signal confusion without the pressure of speaking up.',
      tags: ['ESP32', 'Dart', 'Classroom UX'],
      cover: 'assets/projects/verbasense/poster.jpg', coverFit: 'contain', tone: 'lavender',
      problem: 'Students can leave questions unasked because they worry about looking uninformed. Teachers then miss the moments when help is needed.',
      contributionTitle: 'Our approach',
      contribution: 'We developed a feedback concept combining AI-assisted language cues, a study light, and a teacher-facing signal. The aim was to fit feedback into the classroom without singling a student out.',
      result: 'The project brought the concept into a demonstrable prototype. Its central design decision was to make asking for help part of the learning environment, rather than a public interruption.',
      media: 'verbasense',
      gallery: [
        { src: 'assets/projects/verbasense/poster.jpg', caption: 'Study-light concept and the student-to-teacher feedback flow.' },
        { src: 'assets/projects/verbasense/presentation-1.jpg', caption: 'Presenting the classroom problem and proposed feedback system.' },
        { src: 'assets/projects/verbasense/presentation-2.jpg', caption: 'Explaining the concept during the project presentation.' }
      ],
      documents: []
    },
    {
      id: 'snoreless', title: 'Snoreless', shortTitle: 'Snoreless',
      category: 'Assistive Tech', filters: ['Assistive Tech', 'Medical Devices'],
      context: 'Temasek Polytechnic team project', role: 'Device concept & prototyping',
      status: 'Award-winning concept', outcome: 'Merit & Best Poster Award',
      summary: 'A silicone mouthguard concept using inflatable air bags to support tongue positioning during sleep.',
      tags: ['Assistive design', 'Pneumatics', 'Prototyping'],
      cover: 'assets/projects/snoreless/team-photo.png', coverFit: 'cover', tone: 'rose',
      problem: 'Tongue-retaining devices using suction inspired us to explore a different mechanism for a more discreet oral device.',
      contributionTitle: 'Our approach',
      contribution: 'We developed a positive-pressure concept: a motor inflates air bags within a silicone mouthguard to hold the tongue in position. The project explored the mechanism through design and prototyping.',
      result: 'Snoreless received a Merit & Best Poster Award. The work shown is a device concept and prototype, with clinical performance still requiring validation.',
      media: 'snoreless',
      gallery: [{ src: 'assets/projects/snoreless/team-photo.png', caption: 'The Snoreless team with the oral-device project.' }],
      documents: [{ title: 'Snoreless presentation', href: 'assets/documents/snoreless/final-slides.pdf', preview: 'assets/previews/snoreless/slides-cover.jpg', meta: 'Presentation · PDF' }]
    },
    {
      id: 'wbgt', title: 'Solar Powered WBGT Monitor', shortTitle: 'Solar Powered WBGT',
      category: 'Smart Sensing', filters: ['Smart Sensing', 'Embedded Systems'],
      context: 'Student team project', role: 'Solar integration & prototyping',
      status: 'Hardware prototype', outcome: 'Power designed around the place it is used.',
      summary: 'Solar-assisted heat-stress monitoring designed for outdoor use and less frequent battery maintenance.',
      tags: ['Solar power', 'Sensors', 'Enclosure design'],
      cover: 'assets/projects/wbgt/device-front.jpg', coverFit: 'contain', tone: 'sage',
      problem: 'An outdoor monitor needs reliable power as well as useful readings. Recharging and replacing batteries can interrupt monitoring.',
      contributionTitle: 'Our approach',
      contribution: 'We added solar-assisted power to a Wet Bulb Globe Temperature (WBGT) monitor and built the enclosure and mounting around outdoor use. Sunlight becomes an available energy source at the point of deployment.',
      result: 'The prototype integrates sensing, solar charging, and a physical enclosure. Solar assistance is intended to extend operating time and reduce battery maintenance; the report documents the project work.',
      media: 'wbgt',
      views: [
        { label: 'Front', src: 'assets/projects/wbgt/device-front.jpg', caption: 'Front view of the monitor and its supporting enclosure.' },
        { label: 'Side', src: 'assets/projects/wbgt/device-side.jpg', caption: 'Side profile of the assembled prototype.' },
        { label: 'Back', src: 'assets/projects/wbgt/device-back.jpg', caption: 'Rear construction and mounting arrangement.' },
        { label: 'Internals', src: 'assets/projects/wbgt/device-internals.jpg', caption: 'Internal electronics and wiring.' }
      ],
      gallery: [{ src: 'assets/projects/wbgt/group-photo.jpg', caption: 'The project team with the completed WBGT prototype.' }],
      documents: [{ title: 'WBGT project report', href: 'assets/documents/wbgt/final-report.pdf', preview: 'assets/previews/wbgt/report-cover.jpg', meta: 'Report · PDF' }]
    },
    {
      id: 'liftoff', title: 'LiftOff', shortTitle: 'LiftOff',
      category: 'Assistive Tech', filters: ['Assistive Tech'],
      context: 'Student team project', role: 'Assistive product development',
      status: 'Working prototype', outcome: 'Helping people stand with more independence.',
      summary: 'A button-operated rising seat prototype for older adults and people experiencing muscle loss.',
      tags: ['CAD', '3D printing', 'Fabrication'],
      cover: 'assets/thumbnails/liftoff-demo.jpg', coverFit: 'contain', tone: 'peach',
      problem: 'Standing up from a chair can be difficult for older adults and people with sarcopenia. Needing another person to help can also reduce a sense of independence.',
      contributionTitle: 'Our approach',
      contribution: 'We developed a seat that raises the user at an angle with a button press. The concept explores how a standing aid could be integrated into seating that people already use.',
      result: 'A working prototype demonstrates the raising mechanism. Chairs, mobility devices, and transport seating are potential applications that would need their own integration and safety testing.',
      media: 'liftoff',
      gallery: [
        { src: 'assets/projects/liftoff/group-photo-cropped.jpg', caption: 'The LiftOff team with the project.', position: 'center 30%' },
        { src: 'assets/projects/liftoff/presentation-photo.jpg', caption: 'Presenting the rising-seat concept and prototype.' }
      ],
      documents: []
    },
    {
      id: 'cellwave', title: 'CellWave Technologies', shortTitle: 'CellWave Technologies',
      category: 'Medical Devices', filters: ['Medical Devices', 'Computer Vision'],
      context: 'Research Assistant · Sep 2021-May 2022', role: 'Python automation & PDMS fabrication',
      status: 'Adopted workflow', outcome: 'PDMS mould workflow adopted into standard procedure.',
      summary: 'Automatic cartridge alignment and a repeatable PDMS moulding process for a cell-sorting workflow.',
      tags: ['Python', 'Computer vision', 'Microfluidics'],
      cover: 'assets/projects/cellwave/cell-sorter.jpg', coverFit: 'cover', tone: 'ice',
      problem: 'The cell-sorting microchip needed each newly inserted cartridge aligned to a precise working region. PDMS parts were also cut and punched by hand, creating inconsistent pieces and avoidable rework.',
      contributionTitle: 'My contribution',
      contribution: 'I taught myself computer vision and alignment algorithms to automate cartridge positioning. I also proposed a PDMS mould and iterated PLA and resin versions to replace manual cutting and punching.',
      result: "The alignment program automated positioning for new cartridge inserts. The PDMS mould worked through successive iterations and was adopted into the company's standard procedure.",
      media: 'cellwave',
      gallery: [
        { src: 'assets/projects/cellwave/company-photo.jpg', caption: 'With the CellWave Technologies team.' },
        { src: 'assets/projects/cellwave/cell-culture.jpg', caption: 'Cell culture work alongside the device-development process.' },
        { src: 'assets/projects/cellwave/cell-sorter.jpg', caption: 'The cell sorter and associated laboratory setup.' },
        { src: 'assets/projects/cellwave/old-pdms-cutting.jpg', caption: 'Earlier process: PDMS parts cut and punched by hand.' },
        { src: 'assets/projects/cellwave/pdms-mould-1.jpg', caption: 'PDMS mould development: first documented iteration.' },
        { src: 'assets/projects/cellwave/pdms-mould-2.jpg', caption: 'A further mould iteration exploring repeatable fabrication.' },
        { src: 'assets/projects/cellwave/pdms-mould-3.jpg', caption: 'The mould development through successive prototypes.' }
      ],
      documents: [{ title: 'CellWave internship report', href: 'assets/documents/cellwave/sip-final-report.pdf', preview: 'assets/previews/cellwave/report-cover.jpg', meta: 'Report · PDF' }]
    },
    {
      id: 'kokoni', title: 'KOKONI / Moxin', shortTitle: 'KOKONI / Moxin',
      category: 'AI-Powered', filters: ['AI-Powered'],
      context: 'Industry collaboration & backend development', role: 'Product prototyping & software workflows',
      status: 'Prototype & Blender workflow', outcome: 'From a concept sketch to an editable 3D model.',
      summary: 'Mixin paint mixing and an AI-assisted sketch-to-Blender workflow for hobbyists and designers.',
      tags: ['AI workflows', 'Blender', 'Backend development'],
      cover: 'assets/previews/kokoni/moxin-slide26.jpg', coverFit: 'contain', tone: 'sand',
      problem: 'Hobbyists often need to buy individual paint colours and struggle to turn original sketches into editable models. Both interrupt the process of making something personal.',
      contributionTitle: 'My contribution',
      contribution: 'Through the KOKONI collaboration, we developed Mixin, a CMYK-based paint-mixing concept, alongside a sketch-to-3D workflow. In my subsequent Moxin backend role, I developed the pipeline for a Blender plug-in that turns sketches into editable object files.',
      result: 'The work explored two connected making workflows: mixing paint on demand and bringing AI-generated models into Blender for further editing. The selected slides show the image-to-model pipeline, plug-in, and results.',
      media: 'kokoni',
      gallery: [
        { src: 'assets/projects/kokoni/kokoni-presentation.jpg', caption: 'Presenting the KOKONI collaboration and product work.' },
        { src: 'assets/projects/kokoni/kokoni-presentation-2.jpg', caption: 'Discussing the project with the presentation team.' }
      ],
      documents: [{ title: 'Full Moxin presentation', href: 'assets/documents/kokoni/moxin-presentation.pdf', preview: 'assets/previews/kokoni/moxin-slide21.jpg', meta: '31 slides · PDF' }]
    }
  ],
  experience: [
    { date: 'TIIDE programme / Backend role: Oct-Dec 2025', organisation: 'KOKONI / Moxin', role: 'Backend Developer / Product Development', text: 'Developed Mixin paint-mixing concepts and the backend for an AI-assisted sketch-to-Blender workflow, connecting product prototyping with software development.', project: 'kokoni' },
    { date: 'Sep 2021-May 2022', organisation: 'CellWave Technologies', role: 'Research Assistant', text: 'Built a Python cartridge-alignment program and developed a PDMS mould workflow that was adopted into standard procedure.', project: 'cellwave' },
    { date: 'Case study forthcoming', organisation: 'Digital Place Vision', role: 'Drone Robotics R&D Internship', text: 'Drone robotics research and development.', project: null }
  ],
  leadership: [
    { organisation: 'NODE', role: 'Secretary', context: 'SUTD Engineering Product Development Executive Committee' },
    { organisation: 'Healthcare Innovation Club', role: 'Strategic & Events Lead', context: 'Singapore University of Technology and Design' },
    { organisation: 'IES-TP Student Chapter', role: 'Honorary Secretary', context: 'Institution of Engineers Singapore · Temasek Polytechnic' }
  ],
  recognition: [
    { title: 'Merit & Best Poster Award', context: 'Snoreless · Assistive device concept', kind: 'Design recognition', project: 'snoreless' },
    { title: 'SUTD Undergraduate Merit Scholarship', context: 'Singapore University of Technology and Design', kind: 'Scholarship' },
    { title: 'First Prize · AI as Tool, Teammate', context: 'Design Thinking & Innovation competition · SUTD', kind: 'Design recognition' },
    { title: 'Most Technically Robust Design', context: 'Design Thinking & Innovation · SUTD', kind: 'Design recognition' },
    { title: 'Baby Shark Fund', context: 'Project funding for MIXIN, PatchUp and Vantage · SUTD', kind: 'Project funding' },
    { title: 'TIIDE Scholarship', context: 'Zhejiang University programme', kind: 'Scholarship' },
    { title: 'Diploma with Merit', context: 'Biomedical Engineering · Temasek Polytechnic · 2022', kind: 'Academic recognition' }
  ]
};
if (typeof module !== 'undefined') module.exports = portfolio;
