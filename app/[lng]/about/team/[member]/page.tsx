import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TeamMemberDetail from '../../../../pages/Team/TeamMemberDetail';
import { teamMembers } from '../../../../pages/Team/team.constants';
import { SITE } from '../../../../lib/site';
import { getAlternates } from '../../../../lib/seo';

export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    member: member.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string; member: string }> }): Promise<Metadata> {
  const { lng, member: slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  
  if (!member) {
    return {
      title: `Team Member | ${SITE.name}`,
    };
  }

  const title = `${member.name} | ${SITE.name}`;

  return {
    title,
    openGraph: {
      title,
      url: `${SITE.url}/${lng}/about/team/${member.slug}`,
    },
    alternates: getAlternates(lng, `/about/team/${member.slug}`),
  };
}

export default async function Page({ params }: { params: Promise<{ lng: string; member: string }> }) {
  const { lng, member: slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    notFound();
  }

  return <TeamMemberDetail member={member} lng={lng} />;
}
