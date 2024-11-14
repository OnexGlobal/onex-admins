import { useEffect, useState } from "react";
import { useFetchBlog } from "../../hooks/blog/useFetchBlogs.hook";
import { BlogType } from "@repo/types/src/marketing-content";
import { useFetchLanguages } from "../../hooks/banners/useFetchLanguages.hook";
import { Button } from "antd";
import { Loader } from "../../components/loader/Loader";
import { NotFound } from "../../components/table/NotFound";
import { NoContentResultIcon } from "../../assets/icons/NoContentResultIcon";
import TableBlog from "./TableBlog";
import CreateBlogDrawer from "./CreateBlog";

interface Props {
  blog_create?: boolean;
  blog_edit?: boolean;
  blog_delete?: boolean;
}

export default function Blog({ blog_create, blog_edit, blog_delete }: Props) {
  const [filters, setFilters] = useState<object>({});
  const { blogs = [], meta, refetch, isLoading } = useFetchBlog(filters);
  const [blog, setBlog] = useState<boolean | BlogType>(false);
  const [dataSource, setDataSource] = useState<BlogType[]>([]);
  const { languages = [] } = useFetchLanguages();

  useEffect(() => {
    if (blogs.length) {
      setDataSource(blogs);
    }
  }, [blogs]);

  return (
    <>
      <h1 className="text-title mb-[24px]">Blog</h1>

      {dataSource?.length > 0 && blog_create ? (
        <Button
          className="bg-oxford-blue-300 text-white mb-[16px]"
          type="default"
          onClick={() => setBlog(true)}
        >
          Create blog
        </Button>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : !dataSource?.length ? (
        <NotFound
          icon={<NoContentResultIcon />}
          title={"No blogs yet"}
          text={"Once there will be blogs they will appear here"}
          reset={
            blog_create ? (
              <Button
                type="default"
                onClick={() => setBlog(true)}
                className="bg-oxford-blue-300 text-white"
              >
                Create blog
              </Button>
            ) : (
              <></>
            )
          }
        />
      ) : (
        <TableBlog
          dataSource={dataSource}
          setDataSource={setDataSource}
          setBlog={setBlog}
          meta={meta}
          languages={languages}
          blog_edit={blog_edit}
          setFilters={setFilters}
        />
      )}

      <CreateBlogDrawer
        reFetchBlogs={refetch}
        setBlog={setBlog}
        blog={blog}
        languages={languages}
        blog_delete={blog_delete}
      />
    </>
  );
}
