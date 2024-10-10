'use server'

export async function newPost(formData: FormData) {
  console.log(`Title ${formData.get('post-title')}`)
  return ''
}
