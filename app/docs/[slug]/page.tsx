import DocDetailClient from './DocDetailClient'

export async function generateStaticParams() {
  const staticSlugs = [
    'connexion_microsoft',
    'installation_issues',
    'microsoft_connection',
    'problemes_installation'
  ]
  
  try {
    const response = await fetch('https://api.github.com/repos/divizion-project/divizion-docu/contents/docs', {
      next: { revalidate: 3600 }
    })
    if (response.ok) {
      const data = await response.json()
      const slugs = data
        .filter((file: any) => file.name.endsWith('.json'))
        .map((file: any) => ({
          slug: file.name.replace('.json', '')
        }))
      return slugs.length > 0 ? slugs : staticSlugs.map(slug => ({ slug }))
    }
  } catch (error) {
    console.log('Using static slugs')
  }
  
  return staticSlugs.map(slug => ({ slug }))
}

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  return <DocDetailClient params={resolvedParams} />
}
