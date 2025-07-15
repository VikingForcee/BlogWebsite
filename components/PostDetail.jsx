import React from 'react';
import moment from 'moment';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'heading-two':
        return <h2 key={index} className="text-2xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
      case 'heading-one':
        return <h1 key={index} className="text-3xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
      case 'block-quote':
        return <blockquote key={index} className="italic border-l-4 border-gray-300 pl-4 py-2 mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</blockquote>;
      case 'bulleted-list':
        return (
          <ul key={index} className="list-disc pl-6 mb-8">
            {obj.children.map((listItem, listItemIndex) => {
              // Handle the nested structure specific to Hygraph
              // Each list item has a list-item-child that contains the actual content
              const listItemContent = listItem.children.map((child, childIndex) => {
                if (child.type === 'list-item-child') {
                  return child.children.map((grandChild, grandChildIndex) => getContentFragment(`list-${index}-${listItemIndex}-${childIndex}-${grandChildIndex}`,
                    grandChild.text,
                    grandChild,
                  ));
                }
                return null;
              });
              return <li key={`li-${listItemIndex}`} className="mb-2">{listItemContent}</li>;
            })}
          </ul>
        );
      case 'numbered-list':
        return (
          <ol key={index} className="list-decimal pl-6 mb-8">
            {obj.children.map((listItem, listItemIndex) => {
              // Handle the nested structure specific to Hygraph
              // Each list item has a list-item-child that contains the actual content
              const listItemContent = listItem.children.map((child, childIndex) => {
                if (child.type === 'list-item-child') {
                  return child.children.map((grandChild, grandChildIndex) => getContentFragment(`list-${index}-${listItemIndex}-${childIndex}-${grandChildIndex}`,
                    grandChild.text,
                    grandChild,
                  ));
                }
                return null;
              });
              return <li key={`li-${listItemIndex}`} className="mb-2">{listItemContent}</li>;
            })}
          </ol>
        );
      case 'code-block':
        return <pre key={index} className="bg-gray-100 p-4 mb-8 rounded overflow-x-auto"><code>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</code></pre>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title || ''}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="mb-8 rounded"
          />
        );
      case 'link':
        return (
          <a key={index} href={obj.href} target={obj.openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
          </a>
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img src={post.featuredImage.url} alt=" " className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={post.author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
