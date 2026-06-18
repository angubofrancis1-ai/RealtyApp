const [likes, setLikes] = useState(post.likes || 0);

const handleLike = async () => {
  await fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
  setLikes(likes + 1);
};
