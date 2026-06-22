import { Client } from '@notionhq/client';

export interface Vacancy {
  id: string;
  name: string;
  type: string;
  department: string;
  location: string;
  shortDescription: string;
  blocks: string;
}

function richTextToHtml(rt: any[]): string {
  return rt
    .map((item) => {
      let text = item.plain_text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      if (item.annotations?.bold) text = `<strong>${text}</strong>`;
      if (item.annotations?.italic) text = `<em>${text}</em>`;
      if (item.href) text = `<a href="${item.href}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join('');
}

function richTextToString(rt: any[]): string {
  return rt.map((r) => r.plain_text).join('');
}

function renderBlocks(blocks: any[]): string {
  const out: string[] = [];
  const listBuffer: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listBuffer.length) {
      out.push(`<${listType}>${listBuffer.join('')}</${listType}>`);
      listBuffer.length = 0;
      listType = null;
    }
  };

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item') {
      if (listType !== 'ul') { flushList(); listType = 'ul'; }
      listBuffer.push(`<li>${richTextToHtml(block.bulleted_list_item.rich_text)}</li>`);
      continue;
    }
    if (block.type === 'numbered_list_item') {
      if (listType !== 'ol') { flushList(); listType = 'ol'; }
      listBuffer.push(`<li>${richTextToHtml(block.numbered_list_item.rich_text)}</li>`);
      continue;
    }
    flushList();

    switch (block.type) {
      case 'paragraph': {
        const text = richTextToHtml(block.paragraph.rich_text);
        if (text) out.push(`<p>${text}</p>`);
        break;
      }
      case 'heading_1':
        out.push(`<h3>${richTextToHtml(block.heading_1.rich_text)}</h3>`);
        break;
      case 'heading_2':
        out.push(`<h4>${richTextToHtml(block.heading_2.rich_text)}</h4>`);
        break;
      case 'heading_3':
        out.push(`<h4>${richTextToHtml(block.heading_3.rich_text)}</h4>`);
        break;
      case 'callout':
        out.push(`<blockquote>${richTextToHtml(block.callout.rich_text)}</blockquote>`);
        break;
    }
  }
  flushList();
  return out.join('\n');
}

export async function getOpenVacancies(): Promise<Vacancy[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const dbId = import.meta.env.NOTION_VACANCIES_DB_ID;
  if (!token || !dbId) return [];

  const notion = new Client({ auth: token });

  const response = await notion.databases.query({
    database_id: dbId,
    filter: { property: 'Status', select: { equals: 'Open' } },
    sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
  });

  return Promise.all(
    response.results.map(async (page: any) => {
      const props = page.properties;
      const blocksRes = await notion.blocks.children.list({ block_id: page.id });
      return {
        id: page.id,
        name: richTextToString(props['Name'].title),
        type: props['Type']?.select?.name ?? '',
        department: props['Department']?.select?.name ?? '',
        location: props['Location']?.select?.name ?? '',
        shortDescription: richTextToString(props['Short Description']?.rich_text ?? []),
        blocks: renderBlocks(blocksRes.results),
      };
    })
  );
}
