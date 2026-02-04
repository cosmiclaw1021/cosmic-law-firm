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
    id: 'john',
    name: 'John D. Robertson',
    slug: 'john-robertson',
    titleKey: 'team.members.john.title',
    specialtyKey: 'team.members.john.specialty',
    descriptionKey: 'team.members.john.description',
    locationKey: 'team.members.john.location',
    educationKey: 'team.members.john.education',
    imageSrc: '/team/team_JohnDRobertson.jpeg',
    imageAltKey: 'team.members.john.imageAlt',
    detailKey: 'team.details.john',
  },
  {
    id: 'heath',
    name: 'John Heath',
    slug: 'john-heath',
    titleKey: 'team.members.heath.title',
    specialtyKey: 'team.members.heath.specialty',
    descriptionKey: 'team.members.heath.description',
    locationKey: 'team.members.heath.location',
    educationKey: 'team.members.heath.education',
    imageSrc: '/team/team_johnHeath.jpg',
    imageAltKey: 'team.members.heath.imageAlt',
    detailKey: 'team.details.heath',
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
