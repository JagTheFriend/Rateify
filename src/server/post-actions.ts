'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import type {
  CustomPostType,
  CustomUserType,
  ReturnTypeOfPost,
} from '~/lib/types'
import { getUserDetail } from '~/lib/utils'
import { db, firebaseApp } from './db'

const NewPostSchema = z.object({
  postId: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  imageFiles: z.instanceof(File).array().min(1),
})

export async function newPost(
  formData: FormData,
): Promise<{ message: string; status: 401 | 200 | 503 | 507 }> {
  const currentUser = auth()

  if (!currentUser?.userId) {
    return { message: 'Unauthenticated', status: 401 }
  }

  const uploadData = {
    postId: uuidv4(),
    title: formData.get('post-title') as string,
    description: formData.get('post-description') as string,
    imageFiles: formData.getAll('image') as File[],
  }

  try {
    const parsedUploadData = NewPostSchema.parse(uploadData)

    if (
      parsedUploadData.imageFiles.filter((file) => file.size > 8.389e6).length >
      0
    ) {
      return {
        message: 'Image too big',
        status: 507,
      }
    }

    const storage = getStorage(firebaseApp)

    let index = 0
    for (let file of parsedUploadData.imageFiles) {
      const storageRef = ref(
        storage,
        `posts/${parsedUploadData.postId}/${index}`,
      )
      await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          postId: parsedUploadData.postId,
          name: file.name,
          size: file.size.toString(),
        },
      })
      index++
    }
    await db.post.create({
      data: {
        id: parsedUploadData.postId,
        description: parsedUploadData.description,
        title: parsedUploadData.title,
        numberOfImages: parsedUploadData.imageFiles.length,
        authorId: currentUser.userId,
      },
    })
    return { message: parsedUploadData.postId, status: 200 }
  } catch (error) {
    console.warn(error)
    return { message: 'Server Error', status: 503 }
  }
}

export async function getPostData(postId: string): Promise<{
  message: ReturnTypeOfPost
  status: 404 | 200
}> {
  const post = await db.post.findUnique({ where: { id: postId } })

  if (!post) {
    return { message: {} as ReturnTypeOfPost, status: 404 }
  }

  const returnData: ReturnTypeOfPost = { ...post, imageUrls: [] }

  // Create a reference with an initial file path and name
  for (let index = 0; index < post.numberOfImages; index++) {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/rateify-17fc8.appspot.com/o/posts%2F${postId}%2F${index}?alt=media`
    returnData.imageUrls.push(imageUrl)
  }

  return {
    message: returnData,
    status: 200,
  }
}

export async function likeOrDislikePost(
  type: 'like' | 'dislike',
  postId: string,
  decrement = false,
): Promise<{ message: string; status: 404 | 200 | 503 }> {
  try {
    if (type == 'like') {
      if (!decrement) {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            likeCounter: {
              increment: 1,
            },
          },
        })
      } else {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            likeCounter: {
              decrement: 1,
            },
          },
        })
      }
    } else {
      if (!decrement) {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            dislikeCounter: {
              increment: 1,
            },
          },
        })
      } else {
        await db.post.update({
          where: {
            id: postId,
          },
          data: {
            dislikeCounter: {
              decrement: 1,
            },
          },
        })
      }
    }
    revalidatePath(`/view/${postId}`)
    return { message: 'Success', status: 200 }
  } catch (error) {
    return { message: 'Server Error', status: 503 }
  }
}

export async function getListOfPosts(
  cursorId?: string,
  search = '',
  authorId = '',
) {
  try {
    var posts

    if (!cursorId) {
      posts = await db.post.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
            {
              authorId: {
                equals: authorId,
              },
            },
          ],
        },
      })
    } else {
      posts = await db.post.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        cursor: {
          id: cursorId,
        },
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
            {
              authorId: {
                equals: authorId,
              },
            },
          ],
        },
      })
    }

    const postAuthors = await clerkClient().users.getUserList({
      userId: posts.map((post) => post.authorId),
    })

    const userData = postAuthors.data.map((commentAuthor) =>
      getUserDetail(commentAuthor),
    )

    const finalData: CustomPostType[] = posts.map((post) => ({
      ...post,
      imageUrls: [...Array(post.numberOfImages).keys()].map(
        (_, index) =>
          `https://firebasestorage.googleapis.com/v0/b/rateify-17fc8.appspot.com/o/posts%2F${post.id}%2F${index}?alt=media`,
      ),
      authorData:
        userData.filter((user) => user.id === post.authorId)[0] ??
        ({
          id: 'DELETE_USER',
          dateJoined: 2,
          email: 'unknown@example.com',
          image: '',
          username: 'Unknown',
        } as CustomUserType),
    }))
    return { status: 200, message: finalData }
  } catch (error) {
    return {
      message: 'Server Error Occurred. Try again after sometime',
      status: 503,
    }
  }
}
