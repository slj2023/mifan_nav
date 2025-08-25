import { ref } from 'vue'
import { mockData } from '../mock/mock_data.js'
import { useGitHubAPI } from '../apis/useGitHubAPI.js'

export function useNavigation() {
  const categories = ref([])
  const title = ref('')
  const loading = ref(false)
  const error = ref(null)
  const { loadCategoriesFromGitHub } = useGitHubAPI()
  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      // 开发环境模拟网络延迟 测试加载效果
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      const githubData = await loadCategoriesFromGitHub()
      categories.value = githubData.categories
      title.value = githubData.title || '米饭的导航栏'

      // 动态设置页面标题
      document.title = title.value


    } catch (err) {
      error.value = err.message
      console.error('Error fetching categories:', err)
      // 失败则使用本地mock数据
      categories.value = mockData.categories
      title.value = mockData.title
      document.title = title.value
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    title,
    loading,
    error,
    fetchCategories
  }
}
