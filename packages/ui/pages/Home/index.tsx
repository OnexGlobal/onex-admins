import thumbnail from "../../assets/images/thumbnail.png";

const ThumbnailPages = () => {
  return (
    <div>
      <img
        alt={"thumbnail"}
        src={thumbnail}
        className="w-full h-full rounded-[24px] object-cover"
      />
    </div>
  );
};
export default ThumbnailPages;
