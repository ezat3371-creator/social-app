import { useState } from "react";
import { FiBell, FiBookmark, FiCheck, FiHeart, FiImage, FiMessageCircle, FiUser, FiUserPlus } from "react-icons/fi";
import { Header } from "./Feed";

const me = { name: "Ezat Mostafa", handle: "@ezat_mostafa0", avatar: "", followers: 0 };
type Post = { id: number; author: typeof me; time: string; text: string; image?: string; likes: number; comments: { name: string; text: string }[]; liked: boolean; saved: boolean; feeling?: string };
function getPosts(): Post[] { try { const value = localStorage.getItem("route-posts"); return value ? JSON.parse(value) : []; } catch { return []; } }

export function Profile() {
  const [posts] = useState(getPosts);
  const mine = posts.filter(post => post.author.handle === me.handle);
  const saved = posts.filter(post => post.saved);
  const [tab, setTab] = useState("My Posts");
  const [avatar, setAvatar] = useState(() => localStorage.getItem("route-profile-avatar") || "");
  const upload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const image = String(reader.result); localStorage.setItem("route-profile-avatar", image); setAvatar(image); };
    reader.readAsDataURL(file);
  };
  const activePosts = tab === "My Posts" ? mine : saved;
  return <><Header/><main className="profile-page"><section className="profile-cover"><div className="cover-gradient"/><div className="profile-body">
    <label className="profile-avatar-control" title="Upload your profile photo"><input type="file" accept="image/*" onChange={event => upload(event.target.files?.[0])}/>{avatar ? <img className="profile-avatar" src={avatar} alt="Your profile"/> : <span className="profile-avatar avatar-fallback"><FiUser/></span>}<span className="avatar-edit"><FiImage/></span></label>
    <div className="profile-main"><div><h1>{me.name}</h1><p>{me.handle}</p><span className="member-badge">✦ Route Posts member</span></div><div className="profile-stats"><div><small>FOLLOWERS</small><b>{JSON.parse(localStorage.getItem("route-followers") || "[]").length}</b></div><div><small>FOLLOWING</small><b>{JSON.parse(localStorage.getItem("route-following") || "[]").length}</b></div><div><small>BOOKMARKS</small><b>{saved.length}</b></div></div></div>
    <div className="profile-details"><div className="about-box"><b>About</b><p>✉ &nbsp; ezat.mostafa@email.com</p><p>♙ &nbsp; Active on Route Posts</p></div><div className="profile-counts"><button onClick={() => setTab("My Posts")}><small>MY POSTS</small><b>{mine.length}</b></button><button onClick={() => setTab("Saved")}><small>SAVED POSTS</small><b>{saved.length}</b></button></div></div>
  </div></section><section className="profile-tabs"><div><button className={tab === "My Posts" ? "chosen" : ""} onClick={() => setTab("My Posts")}><FiMessageCircle/> My Posts</button><button className={tab === "Saved" ? "chosen" : ""} onClick={() => setTab("Saved")}><FiBookmark/> Saved</button></div><span>{activePosts.length}</span></section>
  {activePosts.length ? <div className="profile-post-list">{activePosts.map(post => <article className="profile-post" key={post.id}><b>{post.author.name}</b><small>{post.author.handle} · {post.time}</small><p>{post.text || "Photo post"}</p>{post.image && <img src={post.image} alt="Post attachment"/>}</article>)}</div> : <div className="profile-empty">You have not {tab === "My Posts" ? "posted" : "saved any posts"} yet.</div>}</main></>;
}

export function Notifications() {
  const [read, setRead] = useState(false);
  const rows = [{ icon: <FiHeart/>, name: "Alaa Ashraf", action: "liked your post.", time: "12 min ago", avatar: "https://i.pravatar.cc/120?img=47" }, { icon: <FiMessageCircle/>, name: "MrMo", action: "commented: ‘مبروك يا بطل’", time: "1 hour ago", avatar: "https://i.pravatar.cc/120?img=13" }, { icon: <FiUserPlus/>, name: "menna", action: "started following you.", time: "Yesterday", avatar: "https://i.pravatar.cc/120?img=44" }];
  return <><Header/><main className="simple-page"><div className="simple-title"><div><span className="title-icon"><FiBell/></span><div><h1>Notifications</h1><p>Stay up to date with your community.</p></div></div><button className="mark-read" onClick={() => setRead(true)}><FiCheck/> Mark all as read</button></div><section className="notification-list">{rows.map((row, index) => <article className={`notification ${read ? "read" : ""}`} key={index}><img src={row.avatar} alt=""/><span className="notification-icon">{row.icon}</span><p><b>{row.name}</b> {row.action}<small>{row.time}</small></p><span className="unread-dot"/></article>)}</section></main></>;
}

export function Settings() {
  const [saved, setSaved] = useState(false);
  return <><Header/><main className="settings-page"><div className="settings-card"><div className="settings-head"><span className="title-icon">♙</span><div><h1>Change Password</h1><p>Keep your account secure by using a strong password.</p></div></div><form onSubmit={event => { event.preventDefault(); setSaved(true); }}><label>Current password<input type="password" placeholder="Enter current password" required/></label><label>New password<input type="password" placeholder="Enter new password" minLength={8} required/><small>At least 8 characters with uppercase, lowercase, number, and special character.</small></label><label>Confirm new password<input type="password" placeholder="Re-enter new password" minLength={8} required/></label><button className="post-button">Update password</button>{saved && <p className="success-note">Password settings saved.</p>}</form></div></main></>;
}
