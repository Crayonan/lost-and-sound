// components/RichText.tsx
import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import Link from 'next/link';
import type {
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedTextNode,
  SerializedElementNode,
  // For specific nodes like Link or Heading, we often rely on their structure
  // and type property rather than importing a dedicated SerializedLinkNode/SerializedHeadingNode
  // unless they are explicitly exported by a feature or the core.
  // For now, we'll use structural typing and type guards.
} from '@payloadcms/richtext-lexical/lexical';

interface RichTextProps {
  content: SerializedEditorState | { root?: { children?: SerializedLexicalNode[] } } | null | undefined;
  className?: string;
}

// Helper function to check if a node is a SerializedTextNode
function isTextNode(node: SerializedLexicalNode): node is SerializedTextNode {
  return node.type === 'text';
}

// Helper function to check if a node has children (characteristic of ElementNodes)
function isElementNode(node: SerializedLexicalNode): node is SerializedElementNode {
  return 'children' in node && Array.isArray((node as SerializedElementNode).children);
}

// More specific type guards based on 'type' property
function isLinkNode(node: SerializedLexicalNode): node is SerializedLexicalNode & { type: 'link', fields: { linkType?: 'custom' | 'reference', url?: string, newTab?: boolean, doc?: { relationTo: string, value: string | { slug?: string } } } } {
  return node.type === 'link';
}

function isHeadingNode(node: SerializedLexicalNode): node is SerializedLexicalNode & { type: 'heading', tag: string } {
  return node.type === 'heading';
}

function isListNode(node: SerializedLexicalNode): node is SerializedLexicalNode & { type: 'list', tag: string, listType?: string } {
  return node.type === 'list';
}

function isListItemNode(node: SerializedLexicalNode): node is SerializedLexicalNode & { type: 'listitem', value?: number } {
  return node.type === 'listitem';
}


const serializeLexicalNodes = (nodes: SerializedLexicalNode[] | undefined): (JSX.Element | null)[] => {
  if (!nodes) return [];

  return nodes.map((node, i) => {
    if (isTextNode(node)) {
      let textElement: JSX.Element = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text || '') }} />;
      const format = node.format || 0;
      if (format & 1) textElement = <strong>{textElement}</strong>;
      if (format & 2) textElement = <em>{textElement}</em>;
      if (format & 4) textElement = <span style={{ textDecoration: "underline" }}>{textElement}</span>;
      if (format & 8) textElement = <span style={{ textDecoration: "line-through" }}>{textElement}</span>;
      if (format & 16) textElement = <code>{textElement}</code>;
      if (format & 32) textElement = <sub>{textElement}</sub>;
      if (format & 64) textElement = <sup>{textElement}</sup>;

      return <Fragment key={i}>{textElement}</Fragment>;
    }

    if (!node) return null; // Return null for null nodes

    const children = isElementNode(node) ? serializeLexicalNodes(node.children) : [];

    if (isHeadingNode(node)) {
      const Tag = (node.tag || 'p') as keyof JSX.IntrinsicElements;
      return <Tag key={i}>{children}</Tag>;
    }

    if (isListNode(node)) {
      const ListTag = (node.tag || 'ul') as keyof JSX.IntrinsicElements;
      return <ListTag key={i} className={node.listType ? `list-${node.listType}` : ''}>{children}</ListTag>;
    }

    if (isListItemNode(node)) {
      return <li key={i} value={node.value}>{children}</li>;
    }

    if (isLinkNode(node)) {
      const fields = node.fields || {};
      let href = '#';
      if (fields.linkType === 'custom' && fields.url) {
        href = fields.url;
      } else if (fields.linkType === 'reference' && fields.doc?.value) {
        const doc = fields.doc.value;
        const relationTo = fields.doc.relationTo;
        const slug = typeof doc === 'object' && doc !== null && 'slug' in doc ? doc.slug : doc;
        href = `/${relationTo}/${slug}`; // This is a simplified URL construction
      }
      return (
        <Link href={href} key={i} target={fields.newTab ? '_blank' : '_self'} rel={fields.newTab ? 'noopener noreferrer' : undefined}>
          {children}
        </Link>
      );
    }
    
    if (node.type === 'paragraph') {
      return <p key={i}>{children}</p>;
    }

    if (node.type === 'linebreak') {
      return <br key={i} />;
    }

    // Fallback for unknown element types that might have children
    if (isElementNode(node)) {
        return <div key={i}>{children}</div>;
    }

    return null; // Fallback for unknown leaf nodes
  });
};

const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  return (
    <div className={className}>
      {serializeLexicalNodes(content.root.children)}
    </div>
  );
};

export default RichText;