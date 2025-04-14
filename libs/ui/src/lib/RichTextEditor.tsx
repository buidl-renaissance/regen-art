'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <EditorLoading>Loading editor...</EditorLoading>,
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: string;
}

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = 'Write something...',
  height = '300px',
}: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
  ];

  if (!mounted) {
    return <EditorLoading>Loading editor...</EditorLoading>;
  }

  return (
    <EditorContainer height={height}>
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </EditorContainer>
  );
};

const EditorContainer = styled.div<{ height: string }>`
  .quill {
    height: ${(props) => props.height};
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    
    .ql-toolbar {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    
    .ql-container {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      height: calc(100% - 42px);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .ql-editor {
      height: 100%;
      color: white;
      
      &.ql-blank::before {
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
      }
    }
    
    .ql-stroke {
      stroke: rgba(255, 255, 255, 0.8);
    }
    
    .ql-fill {
      fill: rgba(255, 255, 255, 0.8);
    }
    
    .ql-picker {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .ql-picker-options {
      background-color: #1a1a1a;
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    button:hover,
    button:focus {
      .ql-stroke {
        stroke: #ff3366;
      }
      
      .ql-fill {
        fill: #ff3366;
      }
    }
    
    .ql-active {
      .ql-stroke {
        stroke: #ff3366;
      }
      
      .ql-fill {
        fill: #ff3366;
      }
    }
  }
`;

const EditorLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
`;
