import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-40">
    <div className="absolute rounded-lg bg-center bg-gradient-to-b from-gray-400 via-gray-700 to-black w-full h-40">
      <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-full" style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-40" />
      <div className="flex flex-col rounded-lg p-6 items-center justify-between relative w-full h-full">
        <p className="text-white text-shadow text-sm absolute top-3">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
        <p className="text-white text-shadow font-semibold text-lg text-center m-auto">
          {post.title.split(' ').slice(0, 3).join(' ')}
          {post.title.split(' ').length > 3 ? '...' : ''}
        </p>
        <div className="flex items-center absolute bottom-2 w-full justify-center">
          <Image
            unoptimized
            alt={post.author.name}
            height="15px"
            width="15px"
            className="align-middle drop-shadow-lg rounded-full"
            src={post.author.photo.url}
          />
          <p className="text-sm inline align-middle text-white text-shadow ml-2 font-medium">{post.author.name}</p>
        </div>
        <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
      </div>
    </div>
  </div>
);

export default FeaturedPostCard;
