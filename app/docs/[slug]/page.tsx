import DocDetailClient from './DocDetailClient'

export async function generateStaticParams() {
  const staticSlugs = [
    'getting-started',
    'mod-installation',
    'instances',
    'performance',
    'import-export',
    'troubleshooting'
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

export default function DocDetailPage({ params }: { params: { slug: string } }) {
  return <DocDetailClient params={params} />
}
