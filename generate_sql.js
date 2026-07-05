const fs = require('fs');
const blogs = JSON.parse(fs.readFileSync('blogs.json', 'utf8'));

let sql = "INSERT INTO blogs (slug, title, image, author_name, author_avatar, created_at, draft, categories, content) VALUES \n";

const escape = (str) => {
    if (str === null || str === undefined) return 'NULL';
    return "'" + str.replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
};

const values = blogs.map(blog => {
    const slug = escape(blog.slug);
    const title = escape(blog.title);
    const image = escape(blog.image);
    const author_name = escape(blog.author.name);
    const author_avatar = escape(blog.author.avatar);
    // Convert to MySQL timestamp format
    const dateStr = new Date(blog.date).toISOString().slice(0, 19).replace('T', ' ');
    const created_at = escape(dateStr);
    const draft = blog.draft ? '1' : '0';
    const categories = escape(JSON.stringify(blog.categories));
    const content = escape(blog.content);
    
    return `(${slug}, ${title}, ${image}, ${author_name}, ${author_avatar}, ${created_at}, ${draft}, ${categories}, ${content})`;
});

sql += values.join(",\n") + ";";
fs.writeFileSync('blogs.sql', sql);
console.log("SQL generated successfully.");
