import { hashSync } from 'bcryptjs';
import { User, Profile } from '../models/user';

const generateUserEmail = (user: any) => {
  return `${user.firstName.toLowerCase()}.${user.lastName.toLowerCase()}@devpulse.com`;
};

const organizations: any = {
  Andela: [],
  Irembo: [],
  KLab: [],
  BK: [],
};

const seedUsers = async () => {
  // Random Users
  let users: Array<any> = [
    {
      firstName: 'Emily',
      lastName: 'Wallace',
      email: 'emilywallace@digigene.com',
    },
    {
      firstName: 'Pierce',
      lastName: 'Cotton',
      email: 'piercecotton@digigene.com',
    },
    {
      firstName: 'Irma',
      lastName: 'Hewitt',
      email: 'irmahewitt@digigene.com',
    },
    {
      firstName: 'Miranda',
      lastName: 'Vaughan',
      email: 'mirandavaughan@digigene.com',
    },
    {
      firstName: 'Moss',
      lastName: 'Pope',
      email: 'mosspope@digigene.com',
    },
    {
      firstName: 'Erma',
      lastName: 'Camacho',
      email: 'ermacamacho@digigene.com',
    },
    {
      firstName: 'Latoya',
      lastName: 'Watkins',
      email: 'latoyawatkins@digigene.com',
    },
    {
      firstName: 'Georgia',
      lastName: 'Gonzales',
      email: 'georgiagonzales@digigene.com',
    },
    {
      firstName: 'Whitney',
      lastName: 'Alford',
      email: 'whitneyalford@digigene.com',
    },
    {
      firstName: 'Greta',
      lastName: 'Fernandez',
      email: 'gretafernandez@digigene.com',
    },
    {
      firstName: 'Jordan',
      lastName: 'Mcleod',
      email: 'jordanmcleod@digigene.com',
    },
    {
      firstName: 'Cynthia',
      lastName: 'Hale',
      email: 'cynthiahale@digigene.com',
    },
    {
      firstName: 'Rich',
      lastName: 'Douglas',
      email: 'richdouglas@digigene.com',
    },
    {
      firstName: 'Simone',
      lastName: 'Kelley',
      email: 'simonekelley@digigene.com',
    },
    {
      firstName: 'Sargent',
      lastName: 'Dickerson',
      email: 'sargentdickerson@digigene.com',
    },
    {
      firstName: 'Gibson',
      lastName: 'Cameron',
      email: 'gibsoncameron@digigene.com',
    },
    {
      firstName: 'Mae',
      lastName: 'Weber',
      email: 'maeweber@digigene.com',
    },
    {
      firstName: 'Garcia',
      lastName: 'Hull',
      email: 'garciahull@digigene.com',
    },
    {
      firstName: 'Young',
      lastName: 'Newman',
      email: 'youngnewman@digigene.com',
    },
    {
      firstName: 'Althea',
      lastName: 'Estrada',
      email: 'altheaestrada@digigene.com',
    },
    {
      firstName: 'Anna',
      lastName: 'Bush',
      email: 'annabush@digigene.com',
    },
    {
      firstName: 'Kristie',
      lastName: 'Durham',
      email: 'kristiedurham@digigene.com',
    },
    {
      firstName: 'Jennings',
      lastName: 'Peterson',
      email: 'jenningspeterson@digigene.com',
    },
    {
      firstName: 'Kay',
      lastName: 'Randall',
      email: 'kayrandall@digigene.com',
    },
    {
      firstName: 'Cathleen',
      lastName: 'Waller',
      email: 'cathleenwaller@digigene.com',
    },
    {
      firstName: 'Lynne',
      lastName: 'Wooten',
      email: 'lynnewooten@digigene.com',
    },
    {
      firstName: 'Maxwell',
      lastName: 'Gibbs',
      email: 'maxwellgibbs@digigene.com',
    },
    {
      firstName: 'Petersen',
      lastName: 'Townsend',
      email: 'petersentownsend@digigene.com',
    },
    {
      firstName: 'Wong',
      lastName: 'Booker',
      email: 'wongbooker@digigene.com',
    },
    {
      firstName: 'Pena',
      lastName: 'Dudley',
      email: 'penadudley@digigene.com',
    },
    {
      firstName: 'Wendi',
      lastName: 'Rice',
      email: 'wendirice@digigene.com',
    },
    {
      firstName: 'Tabatha',
      lastName: 'Dominguez',
      email: 'tabathadominguez@digigene.com',
    },
    {
      firstName: 'Brandie',
      lastName: 'Thornton',
      email: 'brandiethornton@digigene.com',
    },
    {
      firstName: 'Kerri',
      lastName: 'Blanchard',
      email: 'kerriblanchard@digigene.com',
    },
    {
      firstName: 'Oconnor',
      lastName: 'Johnson',
      email: 'oconnorjohnson@digigene.com',
    },
    {
      firstName: 'Sabrina',
      lastName: 'Guzman',
      email: 'sabrinaguzman@digigene.com',
    },
    {
      firstName: 'Bender',
      lastName: 'Stout',
      email: 'benderstout@digigene.com',
    },
    {
      firstName: 'Marcy',
      lastName: 'Lindsay',
      email: 'marcylindsay@digigene.com',
    },
    {
      firstName: 'Burks',
      lastName: 'Rosa',
      email: 'burksrosa@digigene.com',
    },
    {
      firstName: 'Dorothea',
      lastName: 'Shaffer',
      email: 'dorotheashaffer@digigene.com',
    },
    {
      firstName: 'Taylor',
      lastName: 'Hudson',
      email: 'taylorhudson@digigene.com',
    },
    {
      firstName: 'Leona',
      lastName: 'Mendez',
      email: 'leonamendez@digigene.com',
    },
    {
      firstName: 'Adriana',
      lastName: 'Griffin',
      email: 'adrianagriffin@digigene.com',
    },
    {
      firstName: 'Montoya',
      lastName: 'Mckay',
      email: 'montoyamckay@digigene.com',
    },
    {
      firstName: 'Avery',
      lastName: 'Travis',
      email: 'averytravis@digigene.com',
    },
    {
      firstName: 'Holman',
      lastName: 'Knowles',
      email: 'holmanknowles@digigene.com',
    },
    {
      firstName: 'Love',
      lastName: 'Washington',
      email: 'lovewashington@digigene.com',
    },
    {
      firstName: 'Bryan',
      lastName: 'Whitaker',
      email: 'bryanwhitaker@digigene.com',
    },
    {
      firstName: 'Joann',
      lastName: 'Garcia',
      email: 'joanngarcia@digigene.com',
    },
    {
      firstName: 'Vicky',
      lastName: 'Duran',
      email: 'vickyduran@digigene.com',
    },
    {
      firstName: 'Contreras',
      lastName: 'Chase',
      email: 'contreraschase@digigene.com',
    },
    {
      firstName: 'Kelsey',
      lastName: 'Cummings',
      email: 'kelseycummings@digigene.com',
    },
    {
      firstName: 'Kristy',
      lastName: 'Alvarez',
      email: 'kristyalvarez@digigene.com',
    },
    {
      firstName: 'Jacquelyn',
      lastName: 'Malone',
      email: 'jacquelynmalone@digigene.com',
    },
    {
      firstName: 'Vinson',
      lastName: 'Melton',
      email: 'vinsonmelton@digigene.com',
    },
    {
      firstName: 'Nikki',
      lastName: 'Mcgowan',
      email: 'nikkimcgowan@digigene.com',
    },
    {
      firstName: 'Saundra',
      lastName: 'Orr',
      email: 'saundraorr@digigene.com',
    },
    {
      firstName: 'Jo',
      lastName: 'Foley',
      email: 'jofoley@digigene.com',
    },
    {
      firstName: 'Garrett',
      lastName: 'Haley',
      email: 'garretthaley@digigene.com',
    },
    {
      firstName: 'Maggie',
      lastName: 'Guthrie',
      email: 'maggieguthrie@digigene.com',
    },
    {
      firstName: 'Frazier',
      lastName: 'Yang',
      email: 'frazieryang@digigene.com',
    },
    {
      firstName: 'Knight',
      lastName: 'Williams',
      email: 'knightwilliams@digigene.com',
    },
    {
      firstName: 'Alta',
      lastName: 'Kirk',
      email: 'altakirk@digigene.com',
    },
    {
      firstName: 'Joni',
      lastName: 'Soto',
      email: 'jonisoto@digigene.com',
    },
    {
      firstName: 'Marylou',
      lastName: 'Dickson',
      email: 'maryloudickson@digigene.com',
    },
    {
      firstName: 'Sheila',
      lastName: 'Prince',
      email: 'sheilaprince@digigene.com',
    },
    {
      firstName: 'Lowery',
      lastName: 'Davis',
      email: 'lowerydavis@digigene.com',
    },
    {
      firstName: 'Alana',
      lastName: 'Church',
      email: 'alanachurch@digigene.com',
    },
    {
      firstName: 'Fischer',
      lastName: 'Parks',
      email: 'fischerparks@digigene.com',
    },
    {
      firstName: 'Mcneil',
      lastName: 'Miranda',
      email: 'mcneilmiranda@digigene.com',
    },
    {
      firstName: 'Dominguez',
      lastName: 'Barlow',
      email: 'dominguezbarlow@digigene.com',
    },
    {
      firstName: 'Moreno',
      lastName: 'Rowe',
      email: 'morenorowe@digigene.com',
    },
    {
      firstName: 'Velma',
      lastName: 'Carney',
      email: 'velmacarney@digigene.com',
    },
    {
      firstName: 'Mckay',
      lastName: 'Park',
      email: 'mckaypark@digigene.com',
    },
    {
      firstName: 'Stark',
      lastName: 'Hill',
      email: 'starkhill@digigene.com',
    },
    {
      firstName: 'Silvia',
      lastName: 'Ochoa',
      email: 'silviaochoa@digigene.com',
    },
    {
      firstName: 'Blanchard',
      lastName: 'Kirkland',
      email: 'blanchardkirkland@digigene.com',
    },
    {
      firstName: 'Beatrice',
      lastName: 'Hampton',
      email: 'beatricehampton@digigene.com',
    },
    {
      firstName: 'Isabelle',
      lastName: 'Roberson',
      email: 'isabelleroberson@digigene.com',
    },
    {
      firstName: 'Lucile',
      lastName: 'Suarez',
      email: 'lucilesuarez@digigene.com',
    },
    {
      firstName: 'Dionne',
      lastName: 'Moss',
      email: 'dionnemoss@digigene.com',
    },
    {
      firstName: 'Beck',
      lastName: 'Thomas',
      email: 'beckthomas@digigene.com',
    },
    {
      firstName: 'Solis',
      lastName: 'Bentley',
      email: 'solisbentley@digigene.com',
    },
    {
      firstName: 'James',
      lastName: 'Shaw',
      email: 'jamesshaw@digigene.com',
    },
    {
      firstName: 'Barrera',
      lastName: 'Gentry',
      email: 'barreragentry@digigene.com',
    },
    {
      firstName: 'Noel',
      lastName: 'Hicks',
      email: 'noelhicks@digigene.com',
    },
    {
      firstName: 'Christian',
      lastName: 'Phillips',
      email: 'christianphillips@digigene.com',
    },
    {
      firstName: 'Jennifer',
      lastName: 'Hayes',
      email: 'jenniferhayes@digigene.com',
    },
    {
      firstName: 'Riley',
      lastName: 'Cantrell',
      email: 'rileycantrell@digigene.com',
    },
    {
      firstName: 'Jami',
      lastName: 'Mueller',
      email: 'jamimueller@digigene.com',
    },
    {
      firstName: 'Hardy',
      lastName: 'Oliver',
      email: 'hardyoliver@digigene.com',
    },
    {
      firstName: 'Saunders',
      lastName: 'Ellis',
      email: 'saundersellis@digigene.com',
    },
    {
      firstName: 'Cecelia',
      lastName: 'Jones',
      email: 'ceceliajones@digigene.com',
    },
    {
      firstName: 'Amber',
      lastName: 'Moreno',
      email: 'ambermoreno@digigene.com',
    },
    {
      firstName: 'Verna',
      lastName: 'Gutierrez',
      email: 'vernagutierrez@digigene.com',
    },
    {
      firstName: 'Houston',
      lastName: 'Collier',
      email: 'houstoncollier@digigene.com',
    },
    {
      firstName: 'Stanley',
      lastName: 'Branch',
      email: 'stanleybranch@digigene.com',
    },
    {
      firstName: 'Tameka',
      lastName: 'Burnett',
      email: 'tamekaburnett@digigene.com',
    },
    {
      firstName: 'Mosley',
      lastName: 'Snyder',
      email: 'mosleysnyder@digigene.com',
    },
    {
      firstName: 'Cline',
      lastName: 'Murphy',
      email: 'clinemurphy@digigene.com',
    },
    {
      firstName: 'Genevieve',
      lastName: 'Cooper',
      email: 'genevievecooper@digigene.com',
    },
    {
      firstName: 'Valarie',
      lastName: 'Wilcox',
      email: 'valariewilcox@digigene.com',
    },
    {
      firstName: 'Hull',
      lastName: 'Pickett',
      email: 'hullpickett@digigene.com',
    },
    {
      firstName: 'Bates',
      lastName: 'Baird',
      email: 'batesbaird@digigene.com',
    },
    {
      firstName: 'Therese',
      lastName: 'Humphrey',
      email: 'theresehumphrey@digigene.com',
    },
    {
      firstName: 'Hope',
      lastName: 'Mitchell',
      email: 'hopemitchell@digigene.com',
    },
    {
      firstName: 'Lucia',
      lastName: 'Griffith',
      email: 'luciagriffith@digigene.com',
    },
    {
      firstName: 'Sanchez',
      lastName: 'Myers',
      email: 'sanchezmyers@digigene.com',
    },
    {
      firstName: 'Macdonald',
      lastName: 'Pacheco',
      email: 'macdonaldpacheco@digigene.com',
    },
    {
      firstName: 'Josie',
      lastName: 'Morrison',
      email: 'josiemorrison@digigene.com',
    },
    {
      firstName: 'Branch',
      lastName: 'Donovan',
      email: 'branchdonovan@digigene.com',
    },
    {
      firstName: 'Thompson',
      lastName: 'Moody',
      email: 'thompsonmoody@digigene.com',
    },
    {
      firstName: 'Katharine',
      lastName: 'George',
      email: 'katharinegeorge@digigene.com',
    },
    {
      firstName: 'Le',
      lastName: 'Le',
      email: 'lele@digigene.com',
    },
    {
      firstName: 'Warner',
      lastName: 'Robertson',
      email: 'warnerrobertson@digigene.com',
    },
    {
      firstName: 'Quinn',
      lastName: 'Meadows',
      email: 'quinnmeadows@digigene.com',
    },
    {
      firstName: 'Dunn',
      lastName: 'Velez',
      email: 'dunnvelez@digigene.com',
    },
    {
      firstName: 'Stafford',
      lastName: 'Frank',
      email: 'staffordfrank@digigene.com',
    },
    {
      firstName: 'Deanna',
      lastName: 'Vinson',
      email: 'deannavinson@digigene.com',
    },
    {
      firstName: 'Lori',
      lastName: 'Barron',
      email: 'loribarron@digigene.com',
    },
    {
      firstName: 'Cleo',
      lastName: 'Harris',
      email: 'cleoharris@digigene.com',
    },
    {
      firstName: 'Hansen',
      lastName: 'Cantu',
      email: 'hansencantu@digigene.com',
    },
    {
      firstName: 'Darla',
      lastName: 'House',
      email: 'darlahouse@digigene.com',
    },
    {
      firstName: 'Kari',
      lastName: 'Chapman',
      email: 'karichapman@digigene.com',
    },
    {
      firstName: 'Nelda',
      lastName: 'Goodwin',
      email: 'neldagoodwin@digigene.com',
    },
    {
      firstName: 'Clements',
      lastName: 'Johnston',
      email: 'clementsjohnston@digigene.com',
    },
    {
      firstName: 'Barrett',
      lastName: 'Nguyen',
      email: 'barrettnguyen@digigene.com',
    },
    {
      firstName: 'Mcclure',
      lastName: 'Gill',
      email: 'mccluregill@digigene.com',
    },
    {
      firstName: 'Mcclain',
      lastName: 'Howard',
      email: 'mcclainhoward@digigene.com',
    },
    {
      firstName: 'Elma',
      lastName: 'Dean',
      email: 'elmadean@digigene.com',
    },
    {
      firstName: 'Mccormick',
      lastName: 'Stephenson',
      email: 'mccormickstephenson@digigene.com',
    },
    {
      firstName: 'Jillian',
      lastName: 'Sweeney',
      email: 'jilliansweeney@digigene.com',
    },
    {
      firstName: 'Elliott',
      lastName: 'Nolan',
      email: 'elliottnolan@digigene.com',
    },
    {
      firstName: 'Newton',
      lastName: 'Burgess',
      email: 'newtonburgess@digigene.com',
    },
    {
      firstName: 'Nash',
      lastName: 'Logan',
      email: 'nashlogan@digigene.com',
    },
    {
      firstName: 'Porter',
      lastName: 'Mcfadden',
      email: 'portermcfadden@digigene.com',
    },
    {
      firstName: 'Joyner',
      lastName: 'Nash',
      email: 'joynernash@digigene.com',
    },
    {
      firstName: 'Rosalyn',
      lastName: 'Mckenzie',
      email: 'rosalynmckenzie@digigene.com',
    },
    {
      firstName: 'Strickland',
      lastName: 'Rosales',
      email: 'stricklandrosales@digigene.com',
    },
    {
      firstName: 'Klein',
      lastName: 'Ross',
      email: 'kleinross@digigene.com',
    },
    {
      firstName: 'Hunter',
      lastName: 'Hopper',
      email: 'hunterhopper@digigene.com',
    },
    {
      firstName: 'Margo',
      lastName: 'Calhoun',
      email: 'margocalhoun@digigene.com',
    },
    {
      firstName: 'Briana',
      lastName: 'Preston',
      email: 'brianapreston@digigene.com',
    },
    {
      firstName: 'Fox',
      lastName: 'Fletcher',
      email: 'foxfletcher@digigene.com',
    },
    {
      firstName: 'Jerri',
      lastName: 'Meyers',
      email: 'jerrimeyers@digigene.com',
    },
    {
      firstName: 'Morgan',
      lastName: 'Robinson',
      email: 'morganrobinson@digigene.com',
    },
    {
      firstName: 'Payne',
      lastName: 'Ramos',
      email: 'payneramos@digigene.com',
    },
    {
      firstName: 'Shauna',
      lastName: 'Atkinson',
      email: 'shaunaatkinson@digigene.com',
    },
    {
      firstName: 'Ballard',
      lastName: 'Bowers',
      email: 'ballardbowers@digigene.com',
    },
    {
      firstName: 'Chaney',
      lastName: 'Andrews',
      email: 'chaneyandrews@digigene.com',
    },
    {
      firstName: 'Krystal',
      lastName: 'Johns',
      email: 'krystaljohns@digigene.com',
    },
    {
      firstName: 'Lopez',
      lastName: 'Gillespie',
      email: 'lopezgillespie@digigene.com',
    },
    {
      firstName: 'Tracey',
      lastName: 'Cole',
      email: 'traceycole@digigene.com',
    },
    {
      firstName: 'Medina',
      lastName: 'Frazier',
      email: 'medinafrazier@digigene.com',
    },
    {
      firstName: 'Krista',
      lastName: 'Erickson',
      email: 'kristaerickson@digigene.com',
    },
    {
      firstName: 'Sharron',
      lastName: 'Mcpherson',
      email: 'sharronmcpherson@digigene.com',
    },
    {
      firstName: 'Cindy',
      lastName: 'Richardson',
      email: 'cindyrichardson@digigene.com',
    },
    {
      firstName: 'Margery',
      lastName: 'Petersen',
      email: 'margerypetersen@digigene.com',
    },
    {
      firstName: 'Rhonda',
      lastName: 'Coleman',
      email: 'rhondacoleman@digigene.com',
    },
    {
      firstName: 'Montgomery',
      lastName: 'Leach',
      email: 'montgomeryleach@digigene.com',
    },
    {
      firstName: 'Cecilia',
      lastName: 'Valdez',
      email: 'ceciliavaldez@digigene.com',
    },
    {
      firstName: 'Tanya',
      lastName: 'Davidson',
      email: 'tanyadavidson@digigene.com',
    },
    {
      firstName: 'Miles',
      lastName: 'Alexander',
      email: 'milesalexander@digigene.com',
    },
    {
      firstName: 'Martina',
      lastName: 'Curtis',
      email: 'martinacurtis@digigene.com',
    },
    {
      firstName: 'Hannah',
      lastName: 'White',
      email: 'hannahwhite@digigene.com',
    },
    {
      firstName: 'Carney',
      lastName: 'Juarez',
      email: 'carneyjuarez@digigene.com',
    },
    {
      firstName: 'Hollie',
      lastName: 'Haynes',
      email: 'holliehaynes@digigene.com',
    },
    {
      firstName: 'Marion',
      lastName: 'Rush',
      email: 'marionrush@digigene.com',
    },
    {
      firstName: 'Waller',
      lastName: 'Mclaughlin',
      email: 'wallermclaughlin@digigene.com',
    },
    {
      firstName: 'Cervantes',
      lastName: 'Molina',
      email: 'cervantesmolina@digigene.com',
    },
    {
      firstName: 'Ingrid',
      lastName: 'Sutton',
      email: 'ingridsutton@digigene.com',
    },
    {
      firstName: 'Rebecca',
      lastName: 'May',
      email: 'rebeccamay@digigene.com',
    },
    {
      firstName: 'Lara',
      lastName: 'Edwards',
      email: 'laraedwards@digigene.com',
    },
    {
      firstName: 'Elsa',
      lastName: 'Sanders',
      email: 'elsasanders@digigene.com',
    },
    {
      firstName: 'Latisha',
      lastName: 'Green',
      email: 'latishagreen@digigene.com',
    },
    {
      firstName: 'Rosa',
      lastName: 'Pate',
      email: 'rosapate@digigene.com',
    },
    {
      firstName: 'Marisol',
      lastName: 'Fisher',
      email: 'marisolfisher@digigene.com',
    },
    {
      firstName: 'Knowles',
      lastName: 'Bird',
      email: 'knowlesbird@digigene.com',
    },
    {
      firstName: 'Combs',
      lastName: 'Russell',
      email: 'combsrussell@digigene.com',
    },
    {
      firstName: 'Brigitte',
      lastName: 'Larson',
      email: 'brigittelarson@digigene.com',
    },
    {
      firstName: 'Grant',
      lastName: 'Kaufman',
      email: 'grantkaufman@digigene.com',
    },
    {
      firstName: 'May',
      lastName: 'Love',
      email: 'maylove@digigene.com',
    },
    {
      firstName: 'Chandler',
      lastName: 'Burch',
      email: 'chandlerburch@digigene.com',
    },
    {
      firstName: 'Figueroa',
      lastName: 'Gould',
      email: 'figueroagould@digigene.com',
    },
    {
      firstName: 'Joy',
      lastName: 'Castillo',
      email: 'joycastillo@digigene.com',
    },
    {
      firstName: 'Byrd',
      lastName: 'Morin',
      email: 'byrdmorin@digigene.com',
    },
    {
      firstName: 'Josefina',
      lastName: 'Wells',
      email: 'josefinawells@digigene.com',
    },
    {
      firstName: 'Hayes',
      lastName: 'Sanford',
      email: 'hayessanford@digigene.com',
    },
    {
      firstName: 'Earlene',
      lastName: 'Mcneil',
      email: 'earlenemcneil@digigene.com',
    },
    {
      firstName: 'Kinney',
      lastName: 'Oneil',
      email: 'kinneyoneil@digigene.com',
    },
    {
      firstName: 'Tricia',
      lastName: 'Wagner',
      email: 'triciawagner@digigene.com',
    },
    {
      firstName: 'Byers',
      lastName: 'Wade',
      email: 'byerswade@digigene.com',
    },
    {
      firstName: 'Walls',
      lastName: 'Emerson',
      email: 'wallsemerson@digigene.com',
    },
    {
      firstName: 'Rojas',
      lastName: 'Rocha',
      email: 'rojasrocha@digigene.com',
    },
    {
      firstName: 'Dolly',
      lastName: 'Boyd',
      email: 'dollyboyd@digigene.com',
    },
    {
      firstName: 'Theresa',
      lastName: 'Gibson',
      email: 'theresagibson@digigene.com',
    },
    {
      firstName: 'Kerr',
      lastName: 'Burton',
      email: 'kerrburton@digigene.com',
    },
    {
      firstName: 'Baird',
      lastName: 'Padilla',
      email: 'bairdpadilla@digigene.com',
    },
    {
      firstName: 'Chrystal',
      lastName: 'Raymond',
      email: 'chrystalraymond@digigene.com',
    },
    {
      firstName: 'Rice',
      lastName: 'Lawrence',
      email: 'ricelawrence@digigene.com',
    },
    {
      firstName: 'Juliana',
      lastName: 'Stuart',
      email: 'julianastuart@digigene.com',
    },
    {
      firstName: 'Liliana',
      lastName: 'Garrett',
      email: 'lilianagarrett@digigene.com',
    },
    {
      firstName: 'Sawyer',
      lastName: 'Bishop',
      email: 'sawyerbishop@digigene.com',
    },
    {
      firstName: 'Vasquez',
      lastName: 'Mccall',
      email: 'vasquezmccall@digigene.com',
    },
    {
      firstName: 'Betsy',
      lastName: 'Best',
      email: 'betsybest@digigene.com',
    },
    {
      firstName: 'Lambert',
      lastName: 'Flores',
      email: 'lambertflores@digigene.com',
    },
    {
      firstName: 'Hurley',
      lastName: 'Quinn',
      email: 'hurleyquinn@digigene.com',
    },
    {
      firstName: 'Mcmillan',
      lastName: 'Tillman',
      email: 'mcmillantillman@digigene.com',
    },
    {
      firstName: 'Harvey',
      lastName: 'Chan',
      email: 'harveychan@digigene.com',
    },
    {
      firstName: 'Wilkins',
      lastName: 'Conner',
      email: 'wilkinsconner@digigene.com',
    },
    {
      firstName: 'Maria',
      lastName: 'Oconnor',
      email: 'mariaoconnor@digigene.com',
    },
    {
      firstName: 'Reyna',
      lastName: 'Leblanc',
      email: 'reynaleblanc@digigene.com',
    },
    {
      firstName: 'Mayo',
      lastName: 'Bass',
      email: 'mayobass@digigene.com',
    },
    {
      firstName: 'Samantha',
      lastName: 'Simon',
      email: 'samanthasimon@digigene.com',
    },
    {
      firstName: 'Rita',
      lastName: 'Lloyd',
      email: 'ritalloyd@digigene.com',
    },
    {
      firstName: 'Castaneda',
      lastName: 'Romero',
      email: 'castanedaromero@digigene.com',
    },
    {
      firstName: 'Parsons',
      lastName: 'Wolfe',
      email: 'parsonswolfe@digigene.com',
    },
    {
      firstName: 'Lorena',
      lastName: 'Wilson',
      email: 'lorenawilson@digigene.com',
    },
    {
      firstName: 'Munoz',
      lastName: 'Stephens',
      email: 'munozstephens@digigene.com',
    },
    {
      firstName: 'Roth',
      lastName: 'Turner',
      email: 'rothturner@digigene.com',
    },
    {
      firstName: 'Patterson',
      lastName: 'Kerr',
      email: 'pattersonkerr@digigene.com',
    },
    {
      firstName: 'Diann',
      lastName: 'Ratliff',
      email: 'diannratliff@digigene.com',
    },
    {
      firstName: 'Campbell',
      lastName: 'Mcbride',
      email: 'campbellmcbride@digigene.com',
    },
    {
      firstName: 'Alexandra',
      lastName: 'Mosley',
      email: 'alexandramosley@digigene.com',
    },
    {
      firstName: 'Casey',
      lastName: 'Decker',
      email: 'caseydecker@digigene.com',
    },
    {
      firstName: 'Berg',
      lastName: 'Miller',
      email: 'bergmiller@digigene.com',
    },
    {
      firstName: 'Sharpe',
      lastName: 'Dorsey',
      email: 'sharpedorsey@digigene.com',
    },
    {
      firstName: 'Beasley',
      lastName: 'Marks',
      email: 'beasleymarks@digigene.com',
    },
    {
      firstName: 'Nellie',
      lastName: 'Gonzalez',
      email: 'nelliegonzalez@digigene.com',
    },
    {
      firstName: 'Steele',
      lastName: 'Lyons',
      email: 'steelelyons@digigene.com',
    },
    {
      firstName: 'Hester',
      lastName: 'Frederick',
      email: 'hesterfrederick@digigene.com',
    },
    {
      firstName: 'Lynn',
      lastName: 'Bryant',
      email: 'lynnbryant@digigene.com',
    },
    {
      firstName: 'Floyd',
      lastName: 'Carrillo',
      email: 'floydcarrillo@digigene.com',
    },
    {
      firstName: 'Mara',
      lastName: 'Hinton',
      email: 'marahinton@digigene.com',
    },
    {
      firstName: 'Hardin',
      lastName: 'Hodges',
      email: 'hardinhodges@digigene.com',
    },
    {
      firstName: 'Isabel',
      lastName: 'Morse',
      email: 'isabelmorse@digigene.com',
    },
    {
      firstName: 'Keller',
      lastName: 'Mejia',
      email: 'kellermejia@digigene.com',
    },
    {
      firstName: 'Kennedy',
      lastName: 'Maxwell',
      email: 'kennedymaxwell@digigene.com',
    },
    {
      firstName: 'Mariana',
      lastName: 'Fry',
      email: 'marianafry@digigene.com',
    },
    {
      firstName: 'Mcgowan',
      lastName: 'Hubbard',
      email: 'mcgowanhubbard@digigene.com',
    },
    {
      firstName: 'Carver',
      lastName: 'Alston',
      email: 'carveralston@digigene.com',
    },
    {
      firstName: 'Dennis',
      lastName: 'Mccoy',
      email: 'dennismccoy@digigene.com',
    },
    {
      firstName: 'Malinda',
      lastName: 'Clements',
      email: 'malindaclements@digigene.com',
    },
    {
      firstName: 'Charity',
      lastName: 'Dejesus',
      email: 'charitydejesus@digigene.com',
    },
    {
      firstName: 'Nolan',
      lastName: 'Bernard',
      email: 'nolanbernard@digigene.com',
    },
    {
      firstName: 'Lynda',
      lastName: 'Horne',
      email: 'lyndahorne@digigene.com',
    },
    {
      firstName: 'Olivia',
      lastName: 'Holmes',
      email: 'oliviaholmes@digigene.com',
    },
    {
      firstName: 'Larson',
      lastName: 'Moses',
      email: 'larsonmoses@digigene.com',
    },
    {
      firstName: 'Gwendolyn',
      lastName: 'Stanton',
      email: 'gwendolynstanton@digigene.com',
    },
    {
      firstName: 'Robertson',
      lastName: 'Arnold',
      email: 'robertsonarnold@digigene.com',
    },
    {
      firstName: 'Rosales',
      lastName: 'Horton',
      email: 'rosaleshorton@digigene.com',
    },
    {
      firstName: 'Deirdre',
      lastName: 'Snider',
      email: 'deirdresnider@digigene.com',
    },
    {
      firstName: 'Latasha',
      lastName: 'Garza',
      email: 'latashagarza@digigene.com',
    },
    {
      firstName: 'Hartman',
      lastName: 'Higgins',
      email: 'hartmanhiggins@digigene.com',
    },
    {
      firstName: 'Addie',
      lastName: 'Lara',
      email: 'addielara@digigene.com',
    },
    {
      firstName: 'Fernandez',
      lastName: 'Terry',
      email: 'fernandezterry@digigene.com',
    },
    {
      firstName: 'Snyder',
      lastName: 'Chang',
      email: 'snyderchang@digigene.com',
    },
    {
      firstName: 'Marta',
      lastName: 'Bray',
      email: 'martabray@digigene.com',
    },
    {
      firstName: 'Kemp',
      lastName: 'Mercer',
      email: 'kempmercer@digigene.com',
    },
    {
      firstName: 'Kristen',
      lastName: 'Goff',
      email: 'kristengoff@digigene.com',
    },
    {
      firstName: 'Helena',
      lastName: 'Salas',
      email: 'helenasalas@digigene.com',
    },
    {
      firstName: 'Woods',
      lastName: 'Flowers',
      email: 'woodsflowers@digigene.com',
    },
    {
      firstName: 'Castillo',
      lastName: 'Hall',
      email: 'castillohall@digigene.com',
    },
    {
      firstName: 'Patricia',
      lastName: 'Pugh',
      email: 'patriciapugh@digigene.com',
    },
    {
      firstName: 'Ola',
      lastName: 'Jacobson',
      email: 'olajacobson@digigene.com',
    },
    {
      firstName: 'Millie',
      lastName: 'Harvey',
      email: 'millieharvey@digigene.com',
    },
    {
      firstName: 'Tania',
      lastName: 'Sloan',
      email: 'taniasloan@digigene.com',
    },
    {
      firstName: 'Kaye',
      lastName: 'Hopkins',
      email: 'kayehopkins@digigene.com',
    },
    {
      firstName: 'Casandra',
      lastName: 'Santos',
      email: 'casandrasantos@digigene.com',
    },
    {
      firstName: 'Henrietta',
      lastName: 'Day',
      email: 'henriettaday@digigene.com',
    },
    {
      firstName: 'Carey',
      lastName: 'England',
      email: 'careyengland@digigene.com',
    },
    {
      firstName: 'Allison',
      lastName: 'Dyer',
      email: 'allisondyer@digigene.com',
    },
    {
      firstName: 'Juana',
      lastName: 'Holman',
      email: 'juanaholman@digigene.com',
    },
    {
      firstName: 'Cara',
      lastName: 'Underwood',
      email: 'caraunderwood@digigene.com',
    },
    {
      firstName: 'Ferguson',
      lastName: 'Brady',
      email: 'fergusonbrady@digigene.com',
    },
    {
      firstName: 'Brittany',
      lastName: 'Manning',
      email: 'brittanymanning@digigene.com',
    },
    {
      firstName: 'Ivy',
      lastName: 'Perez',
      email: 'ivyperez@digigene.com',
    },
    {
      firstName: 'Nell',
      lastName: 'Rollins',
      email: 'nellrollins@digigene.com',
    },
    {
      firstName: 'Lourdes',
      lastName: 'Mcdaniel',
      email: 'lourdesmcdaniel@digigene.com',
    },
    {
      firstName: 'Jarvis',
      lastName: 'Kelly',
      email: 'jarviskelly@digigene.com',
    },
    {
      firstName: 'Harper',
      lastName: 'Parsons',
      email: 'harperparsons@digigene.com',
    },
    {
      firstName: 'Franklin',
      lastName: 'Richard',
      email: 'franklinrichard@digigene.com',
    },
    {
      firstName: 'Mari',
      lastName: 'Singleton',
      email: 'marisingleton@digigene.com',
    },
    {
      firstName: 'Kelley',
      lastName: 'Ellison',
      email: 'kelleyellison@digigene.com',
    },
    {
      firstName: 'Ochoa',
      lastName: 'Casey',
      email: 'ochoacasey@digigene.com',
    },
    {
      firstName: 'Edith',
      lastName: 'Ewing',
      email: 'edithewing@digigene.com',
    },
    {
      firstName: 'Marquita',
      lastName: 'Reilly',
      email: 'marquitareilly@digigene.com',
    },
    {
      firstName: 'Traci',
      lastName: 'Workman',
      email: 'traciworkman@digigene.com',
    },
  ];

  // Create Meaningful emails
  users = users.map((user) => {
    return {
      ...user,
      email: generateUserEmail(user),
    };
  });

  // Share random Users Among organizations
  organizations.Andela = [...users.slice(0, 72)];
  organizations.Irembo = [...users.slice(72, 144)];
  organizations.KLab = [...users.slice(144, 216)];
  organizations.BK = [...users.slice(216, users.length + 1)];

  // Numbers of users per organization
  const usersTypes = {
    admin: 2,
    manager: 5,
    coordinators: 5,
    trainees: 30,
    users: 30,
  };

  // Create an array of users who will be registered
  const registerUsers: Array<any> = [];

  // Populate registerUsers
  Object.entries(organizations).forEach((org: any) => {
    // Admin
    for (let i = 0; i < org[1].length; i++) {
      // Check if user exist in registerUsers

      if (registerUsers.find((user) => user.email === org[1][i].email)) {
        continue;
      }

      if (
        registerUsers.filter(
          (user) => user.organizations.includes(org[0]) && user.role === 'admin'
        ).length === usersTypes.admin
      )
        break;

      registerUsers.push({
        email: org[1][i].email,
        password: hashSync('Test@12345'),
        role: 'admin',
        organizations: [org[0]],
      });
    }

    // Manager
    for (let i = 0; i < org[1].length; i++) {
      if (registerUsers.find((user) => user.email === org[1][i].email))
        continue;

      if (
        registerUsers.filter(
          (user) =>
            user.organizations.includes(org[0]) && user.role === 'manager'
        ).length === usersTypes.manager
      )
        break;

      registerUsers.push({
        email: org[1][i].email,
        password: hashSync('Test@12345'),
        role: 'manager',
        organizations: [org[0]],
      });
    }

    // Coordinators
    for (let i = 0; i < org[1].length; i++) {
      if (registerUsers.find((user) => user.email === org[1][i].email))
        continue;

      if (
        registerUsers.filter(
          (user) =>
            user.organizations.includes(org[0]) && user.role === 'coordinator'
        ).length === usersTypes.coordinators
      )
        break;

      registerUsers.push({
        email: org[1][i].email,
        password: hashSync('Test@12345'),
        role: 'coordinator',
        organizations: [org[0]],
      });
    }

    // users
    for (let i = 0; i < org[1].length; i++) {
      if (registerUsers.find((user) => user.email === org[1][i].email))
        continue;

      if (
        registerUsers.filter(
          (user) => user.organizations.includes(org[0]) && user.role === 'user'
        ).length === usersTypes.users
      )
        break;

      registerUsers.push({
        email: org[1][i].email,
        password: hashSync('Test@12345'),
        role: 'user',
        organizations: [org[0]],
      });
    }

    // Tranee
    for (let i = 0; i < org[1].length; i++) {
      if (registerUsers.find((user) => user.email === org[1][i].email))
        continue;

      if (
        registerUsers.filter(
          (user) =>
            user.organizations.includes(org[0]) && user.role === 'trainee'
        ).length === usersTypes.trainees
      )
        break;

      registerUsers.push({
        email: org[1][i].email,
        password: hashSync('Test@12345'),
        role: 'trainee',
        organizations: [org[0]],
      });
    }
  });

  // Save Users to the database
  await User.deleteMany({});
  registerUsers.unshift({
    email: 'superadmin@devpulse.co',
    password: hashSync('Test@12345'),
    role: 'superAdmin',
    organizations: ['Andela'],
  });
  await User.insertMany(registerUsers);

  // Query users that have been registered from database
  const profiles = [];
  const dbUsers = await User.find().select('_id email');

  // For every db user, generate a profile
  for (let i = 0; i < dbUsers.length; i++) {
    const userProfile = users.find((user) => user.email === dbUsers[i].email);

    if (userProfile) {
      profiles.push({
        user: dbUsers[i]._id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      });
    }
  }

  await Profile.deleteMany({});
  await Profile.insertMany(profiles);

  //   return null;
  return null;
};

export default seedUsers;