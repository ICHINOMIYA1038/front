import React from "react";

interface NewsItemProps {
  date: string;
  category: string;
  title: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ date, category, title }) => {
  const categoryClassName = getCategoryClassName(category);

  return (
    <li className="item">
      <a href="#">
        <p className="date">{date}</p>
        <p className={`category ${categoryClassName}`}>
          <span>{category}</span>
        </p>
        <p className="title">{title}</p>
      </a>
    </li>
  );
};

const NewsList: React.FC = () => (
  <ul className="news-list">
    <NewsItem
      date="2020/4/15"
      category="お知らせ"
      title="ここにお知らせが入りますここにお知らせが入りますここにお知らせが入ります"
    />
    <NewsItem
      date="2020/4/15"
      category="公演情報"
      title="ここにお知らせが入りますここにお知らせが入りますここにお知らせが入ります"
    />
    <NewsItem
      date="2020/4/15"
      category="新着脚本"
      title="ここにお知らせが入りますここにお知らせが入りますここにお知らせが入ります"
    />
    <NewsItem
      date="2020/4/15"
      category="重要"
      title="ここにお知らせが入りますここにお知らせが入りますここにお知らせが入ります"
    />
    {/* 他のニュースアイテムも同様に追加 */}
  </ul>
);

function getCategoryClassName(category: string): string {
  switch (category) {
    case "新着脚本":
      return "new-script";
    case "公演情報":
      return "performance-info";
    case "お知らせ":
      return "notice";
    case "重要":
      return "important";
    default:
      return "";
  }
}

export default NewsList;
