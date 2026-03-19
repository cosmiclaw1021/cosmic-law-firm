export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  titleKey: string;
  specialtyKey: string;
  descriptionKey: string;
  locationKey: string;
  educationKey: string;
  imageSrc: string;
  imageAltKey: string;
  detailKey: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: 'jean',
    name: 'Jean Kwon, Esq.',
    slug: 'jean-kwon',
    titleKey: 'team.members.jean.title',
    specialtyKey: 'team.members.jean.specialty',
    descriptionKey: 'team.members.jean.description',
    locationKey: 'team.members.jean.location',
    educationKey: 'team.members.jean.education',
    imageSrc: '/team/team_JeanKwon.jpg',
    imageAltKey: 'team.members.jean.imageAlt',
    detailKey: 'team.details.jean',
  },
  {
    id: 'david',
    name: 'David Kim, Esq.',
    slug: 'david-kim',
    titleKey: 'team.members.david.title',
    specialtyKey: 'team.members.david.specialty',
    descriptionKey: 'team.members.david.description',
    locationKey: 'team.members.david.location',
    educationKey: 'team.members.david.education',
    imageSrc: '/team/team_DavidKim.jpg',
    imageAltKey: 'team.members.david.imageAlt',
    detailKey: 'team.details.david',
  },
  {
    id: 'scott',
    name: 'Scott Houtz, Esq.',
    slug: 'scott-houtz',
    titleKey: 'team.members.scott.title',
    specialtyKey: 'team.members.scott.specialty',
    descriptionKey: 'team.members.scott.description',
    locationKey: 'team.members.scott.location',
    educationKey: 'team.members.scott.education',
    imageSrc: '/team/team_ScottHoutz.png',
    imageAltKey: 'team.members.scott.imageAlt',
    detailKey: 'team.details.scott',
  },
  {
    id: 'katherine',
    name: 'Katherine Jung',
    slug: 'katherine-jung',
    titleKey: 'team.members.katherine.title',
    specialtyKey: 'team.members.katherine.specialty',
    descriptionKey: 'team.members.katherine.description',
    locationKey: 'team.members.katherine.location',
    educationKey: 'team.members.katherine.education',
    imageSrc: '/team/team_KatherineJung.jpg',
    imageAltKey: 'team.members.katherine.imageAlt',
    detailKey: 'team.details.katherine',
  },
];
