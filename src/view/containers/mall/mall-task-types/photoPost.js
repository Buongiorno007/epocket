import React, { useState } from "react"
import BeforePost from "@containers/mall/mall-task-types/photoPost/beforePost"
import DirectlyPost from "@containers/mall/mall-task-types/photoPost/directlyPost"

export default function PhotoPost() {
  const [postData, setPostData] = useState({})

  return postData.video ? (
    <DirectlyPost postData={postData} setPostData={setPostData} />
  ) : (
    <BeforePost setPostData={setPostData} />
  )
}
