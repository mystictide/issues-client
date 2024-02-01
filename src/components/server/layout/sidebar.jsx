"use server";

import { getRandomPosts, getRandomUsers } from "@/actions/main/actions";
import { readCookie } from "@/assets/js/helpers";
import User from "@/components/client/sidebar/user";
import { cookies } from "next/headers";
import BlogPost from "../blog/blogPost";
import SidebarUsersList from "../user/profile/sidebarUsersList";

export default async function Sidebar() {
  const cookieStore = cookies();
  const user = readCookie(cookieStore, "auth");
  const settings = readCookie(cookieStore, "settings");
  const posts = await getRandomPosts();
  const users = await getRandomUsers();

  return (
    <div className="sidebar">
      {user ? <User user={user} settings={settings} /> : ""}
      <div className="sidebar-content">
        <div className="full-width flex-column">
          {posts?.length > 0 ? (
            <>
              <h5 className="title">Check out these other posts</h5>
              <section className="flex-column main-blog posts">
                <BlogPost data={posts} mini={true} />
              </section>
            </>
          ) : (
            ""
          )}
          {users?.length > 0 ? (
            <>
              <h5 className="title">Check out these authors</h5>
              <section className="flex-column main-blog posts">
                <SidebarUsersList data={users} />
              </section>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
