import fs from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';



export default function BlogPost({ params }) {
    // return <div>My Post: {params.slug}</div>?
    // const blog = {
    //     title: "Typescript tutorial in hindi",
    //     author: "John Doe",
    //     description: "This is a sample blog post description.",
    //     date: "2024-09-02",
    //     content: "<p>This is the content of the blog post. It can include <strong>HTML</strong> tags and other elements.</p>"
    // };

    const filePath = `content/${params.slug}.md`;

    if (!fs.existsSync(filePath)) {
        notFound()
        return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { content, data } = matter(fileContent)
    // console.log(data,content)

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
            <p className="text-base mb-2 border-l-4 border-gray-500 pl-4 italic">&quot;{data.description}&quot;</p>
            <div className="flex gap-2">
                <p className="text-sm text-gray-500 mb-4 italic">By {data.author}</p>
                <p className="text-sm text-gray-500 mb-4">{data.date}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} className="prose dark:prose-invert"></div>
            {/* <OnThisPage htmlContent={htmlContent} /> */}
        </div>
    )
}