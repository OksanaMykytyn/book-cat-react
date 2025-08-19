import React from 'react';

const renderTextWithLinks = (text, keyPrefix) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
        if (urlRegex.test(part)) {
            return (
                <a key={`${keyPrefix}-link-${index}`} href={part} target="_blank" rel="noopener noreferrer">
                    {part}
                </a>
            );
        }
        return part;
    });
};

const renderContent = (contentBlocks) => {
    if (!contentBlocks) return null;

    let h2Counter = 0;

    return contentBlocks.map((block, index) => {
        let blockId = `content-${index}`;

        if (block.type === 'h2') {
            blockId = `heading-${h2Counter}`;
            h2Counter++;
        }

        switch (block.type) {
            // case 'h1':
            //     return <h1 key={index} id={blockId}>{renderTextWithLinks(block.data.text, index)}</h1>;
            case 'h2':
                return <h2 key={index} id={blockId}>{renderTextWithLinks(block.data.text, index)}</h2>;
            case 'h3':
                return <h3 key={index} id={blockId}>{renderTextWithLinks(block.data.text, index)}</h3>;
            case 'paragraph':
                return <p key={index}>{renderTextWithLinks(block.data.text, index)}</p>;
            case 'image':
                const imageUrl = block.data.src;
                return (
                    <figure key={index}>
                        <img src={imageUrl} alt={block.data.alt} />
                        {block.data.caption && <figcaption>{renderTextWithLinks(block.data.caption, index)}</figcaption>}
                    </figure>
                );
            case 'unordered-list':
                return (
                    <ul key={index}>
                        {block.data.items.map((item, i) => (
                            <li key={i}>{renderTextWithLinks(item, `${index}-${i}`)}</li>
                        ))}
                    </ul>
                );
            case 'ordered-list':
                return (
                    <ol key={index}>
                        {block.data.items.map((item, i) => (
                            <li key={i}>{renderTextWithLinks(item, `${index}-${i}`)}</li>
                        ))}
                    </ol>
                );
            case 'table':
                return (
                    <div key={index} className="table-container">
                        <table key={index} className="content-table">
                            <thead>
                                <tr>
                                    {block.data.headers.map((header, i) => (
                                        <th key={i}>{renderTextWithLinks(header, `${index}-${i}-th`)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.data.rows.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j}>{renderTextWithLinks(cell, `${index}-${i}-${j}-td`)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    });
};

export default renderContent;