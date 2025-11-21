import { DocData } from '@/types/documentation';

const REPO_OWNER = 'divizion-project';
const REPO_NAME = 'divizion-docu';


export interface DocFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
}

export async function getDocFiles(): Promise<DocFile[]> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            console.error('Failed to fetch docs list:', response.statusText);
            return [];
        }

        const files: DocFile[] = await response.json();
        return files.filter((file) => file.name.endsWith('.json'));
    } catch (error) {
        console.error('Error fetching docs list:', error);
        return [];
    }
}

export async function getDocContent(url: string): Promise<DocData | null> {
    try {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching doc content:', error);
        return null;
    }
}
