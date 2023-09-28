export default function Header({ title }) {
  const $Header = `
    <header class="document_header">
        ${title ? title : "제목없음"}
    </header>
  `;

  return $Header;
}
