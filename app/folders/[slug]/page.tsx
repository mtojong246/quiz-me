'use client';

export default function Folders({ params }: { params: { slug: string } }) {
    const separatedTitle = params.slug.replace(/-/g, ' ');
    return (
        <h1>{separatedTitle}</h1>
    )
}