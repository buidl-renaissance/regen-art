import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaTags, FaRobot } from 'react-icons/fa';
import { RichTextEditor } from '@gods.work/ui';
import { ForumThread } from '@gods.work/forum';
import { useHandle } from '../hooks/useHandle';

interface ForumPostCreateProps {
  onSubmit?: (thread: ForumThread) => void;
  categories: { id: string; name: string }[];
}

export const ForumPostCreate: React.FC<ForumPostCreateProps> = ({
  onSubmit,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [enableAIResponses, setEnableAIResponses] = useState(true);
  const { handle } = useHandle();

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!content.trim() || content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }

    if (!category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {

      if (enableAIResponses) {
        tags.push('ai');
      }

      const response = await fetch('/api/threads', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          category,
          handle,
          tags
        }),
      });

      const thread = await response.json();

      if (thread.id) {
        onSubmit?.(thread as unknown as ForumThread);
      } else {
        setErrors({
          title: thread.error,
        });
        throw new Error(thread.error);
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Create New Discussion</FormTitle>

      <FormGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
        />
        {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
        {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label>Content</Label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write your post here..."
        />
        {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="tags">
          <FaTags style={{ marginRight: '8px' }} />
          Tags (optional)
        </Label>
        <TagInputContainer>
          <TagInput
            id="tags"
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tags (press Enter or comma to add)"
          />
          <TagAddButton type="button" onClick={handleTagAdd}>
            Add
          </TagAddButton>
        </TagInputContainer>
        <TagsContainer>
          {tags.map((tag) => (
            <Tag key={tag}>
              {tag}
              <TagRemoveButton onClick={() => handleTagRemove(tag)}>
                ×
              </TagRemoveButton>
            </Tag>
          ))}
        </TagsContainer>
      </FormGroup>

      <FormGroup>
        <AIToggleContainer>
          <AIToggleLabel htmlFor="ai-toggle">
            <FaRobot style={{ marginRight: '8px' }} />
            Enable AI Responses
            <AIToggleSwitch>
              <AIToggleCheckbox
                id="ai-toggle"
                type="checkbox"
                checked={enableAIResponses}
                onChange={() => setEnableAIResponses(!enableAIResponses)}
              />
              <AIToggleSlider />
            </AIToggleSwitch>
          </AIToggleLabel>
          <AIToggleDescription>
            When enabled, AI will automatically generate helpful responses to your discussion.
          </AIToggleDescription>
        </AIToggleContainer>
      </FormGroup>

      <SubmitButton type="submit">
        <FaPaperPlane style={{ marginRight: '8px' }} />
        Post Discussion
      </SubmitButton>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  min-width: 800px;
  .quill .ql-container {
    font-family: 'Courier New', monospace;
  }
  .quill .ql-toolbar.ql-snow {
    font-family: 'Courier New', monospace;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #f5f5f5;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.75rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-radius: 4px;
  color: #f5f5f5;
  font-size: 1rem;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-radius: 4px;
  color: #f5f5f5;
  font-size: 1rem;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const EditorContainer = styled.div`
  .quill {
    background-color: #2c2c2c;
    border-radius: 4px;

    .ql-toolbar {
      background-color: #333;
      border: 1px solid #444;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: none;
    }

    .ql-container {
      border: 1px solid #444;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      color: #f5f5f5;
      font-family: 'Courier New', monospace;
      min-height: 200px;
    }
  }
`;

const TagInputContainer = styled.div`
  display: flex;
`;

const TagInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-right: none;
  border-radius: 4px 0 0 4px;
  color: #f5f5f5;
  font-size: 1rem;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const TagAddButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #3498db;
  border: none;
  border-radius: 0 4px 4px 0;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #2c2c2c;
  border-radius: 4px;
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  color: #f5f5f5;
`;

const TagRemoveButton = styled.button`
  background: none;
  border: none;
  color: #f5f5f5;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;

  &:hover {
    color: #e74c3c;
  }
`;

const AIToggleContainer = styled.div`
  margin-top: 1rem;
`;

const AIToggleLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #f5f5f5;
  cursor: pointer;
`;

const AIToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-left: 10px;
`;

const AIToggleCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #3498db;
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const AIToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #444;
  transition: .4s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const AIToggleDescription = styled.p`
  font-size: 0.85rem;
  color: #999;
  margin-top: 0.5rem;
  margin-left: 32px;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;
