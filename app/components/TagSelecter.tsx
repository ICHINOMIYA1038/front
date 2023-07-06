import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Layout from '@/components/Layout';
import SearchForm from '@/components/search';
import PostCard from '@/components/PostCard';
import { Chip,TextField } from '@mui/material';
import { useState } from 'react';




//Homeコンポーネント
export const TagSelecter: React.FC= () => {
    const [selectedTags, setSelectedTags] = useState([]);
    let tags = ['ホラー', 'アクション', '感動', '不条理劇', 'コメディ', '会話劇', 'アングラ', 'コンテンポラリー', '抽象劇', '具象劇', '群像劇', 'Tag12', 'Tag13', 'Tag14', 'Tag15', 'Tag16', 'Tag17', 'Tag18', 'Tag19', 'Tag20'];


    function tagFileter(name:string){
        const regex = new RegExp(name);
  tags = tags.filter(tag => regex.test(tag));
        console.log(tags)
    }

    const handleTagClick=(tag)=>{
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
          } else {
            setSelectedTags([...selectedTags, tag]);
          }
    }

    const handleDeleteTag=(tag)=>{
        setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    }

  return (
    <div>
         <div className="selectedTagContainer" >
        <h2>Selected Tags:</h2>
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            style={{ margin: '0.5rem' }}
          />
        ))}
      </div>
      <div className="selectedTagContainer">
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          clickable
          color={selectedTags.includes(tag) ? 'primary' : 'default'}
          onClick={() => handleTagClick(tag)}
          style={{ margin: '0.5rem' }}
        />
      ))}
      </div>
      <div>
      <TextField
          className="tagInput"
          label="Tag"
          variant="outlined"
          onChange={(e) => {
            tagFileter(e.target.value)
        }}
        />
        </div>
    </div>
  );
};

export default TagSelecter;