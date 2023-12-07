import dayjs from "dayjs";

export default function currentTime() {
  const now = dayjs();
  const formattedTime = now.format("MMM D, h:mm A");

  return formattedTime;
}
