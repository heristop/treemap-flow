import { defineStore } from 'pinia'
import type { Section, Status } from '~~/types'
import { useStatusManagement } from '~/composables/status'
import { useSectionManagement } from '~/composables/section'

const defaultStatus = [
  { name: 'To Do', color: '#FFB3BA' },
  { name: 'In Progress', color: '#FFDFBA' },
  { name: 'Done', color: '#FFFFBA' },
  { name: 'Closed', color: '#BAFFC9' },
]

export const pastelColors = [
  '#FFB3BA', // Light Pink
  '#FFDFBA', // Light Orange
  '#FFFFBA', // Light Yellow
  '#BAFFC9', // Light Green
  '#BAE1FF', // Light Blue
  '#E2CFCF', // Light Red
  '#C9C9FF', // Light Purple
  '#D4A5A5', // Light Rose
  '#FFD1DC', // Light Pinkish
  '#B2B2B2', // Light Gray
  '#FF6961', // Pastel Red
  '#F49AC2', // Pastel Pink
  '#77DD77', // Pastel Green
  '#AEC6CF', // Pastel Blue
  '#CFCFC4', // Pastel Gray
  '#B19CD9', // Pastel Lilac
]

type State = {
  sections: Section[]
  parentMap: { [key: string]: string | null }
  configLoaded: boolean
  dialogMinimized: boolean
  minWidth: number
  minHeight: number
  displayLabel: string
  statuses: Status[]
  viewMode: string
  darkMode: boolean
  isEditingMode: boolean
}

export const useStore = defineStore('store', {
  state: (): State => ({
    sections: [] as Section[],
    parentMap: {} as { [key: string]: string | null },
    configLoaded: false,
    dialogMinimized: false,
    minWidth: 80,
    minHeight: 10,
    displayLabel: 'name',
    statuses: defaultStatus,
    viewMode: 'flex',
    darkMode: false,
    isEditingMode: false,
  }),
  persist: {
    storage: persistedState.localStorage,
  },
  actions: {
    async fetchSectionsFromUrl(url: string): Promise<Section[] | null> {
      return await $fetch<Section[]>(url, { method: 'get' }).catch(() => {
        return null
      })
    },
    async fetchSections(model: string): Promise<void> {
      const sections = await this.getSections(model)
      this.setSections(sections)
      this.initializeParentMap(this.sections)
    },
    async getSections(model: string): Promise<Section[]> {
      return $fetch(`/api/config?model=${model}`, { method: 'get' })
    },
    setSections(sections: Section[]) {
      const { updateParentStatuses } = useStatusManagement()

      const sectionArray = Object.values(sections)
      const extractedStatuses = this.extractStatuses(sectionArray)

      if (extractedStatuses.length > 0) {
        this.statuses = extractedStatuses
      }

      const formattedSections = this.formatSections(sectionArray)

      this.sections = this.applyDefaultStatus(formattedSections)
      updateParentStatuses()
      this.configLoaded = true
    },
    formatSections(sections: Section[]): Section[] {
      return sections.map((section: Section) => {
        const { name, key, children, status, isCollapsed } = section
        const formattedChildren = children ? this.formatSections(children) : []

        return {
          key,
          name,
          children: formattedChildren,
          status: status || '',
          isCollapsed: isCollapsed || false,
        }
      })
    },
    applyDefaultStatus(sections: Section[]): Section[] {
      const { findSectionByKey } = useSectionManagement()

      return sections.map((node) => {
        const existingProject = findSectionByKey(node.key)

        if (!node.status) {
          if (existingProject) {
            node.status = existingProject.status
          }

          if (!existingProject) {
            node.status = this.statuses[0]?.name || ''
          }
        }

        if (node.children) {
          node.children = this.applyDefaultStatus(node.children)
        }

        return node
      })
    },
    extractStatuses(sections: Section[]): Status[] {
      const statusSet = new Set<string>()
      const statusColors: { [key: string]: string } = {}
      let colorIndex = 0

      const traverse = (nodes: Section[]) => {
        nodes.forEach((node) => {
          if (node.status) {
            statusSet.add(node.status)

            if (!statusColors[node.status]) {
              statusColors[node.status] = pastelColors[colorIndex % pastelColors.length] as string
              colorIndex++
            }
          }

          if (node.children) {
            traverse(node.children)
          }
        })
      }
      traverse(sections)

      return Array.from(statusSet).map(status => ({
        name: status,
        color: statusColors[status] || '',
      }))
    },
    updateSectionCollapse(key: string) {
      const section = this.findSectionByKey(key)

      if (section) {
        section.isCollapsed = !section.isCollapsed
      }
    },
    initializeParentMap(sections: Section[]) {
      const buildParentMap = (sections: Section[], parentKey: string | null = null) => {
        sections.forEach((section) => {
          if (parentKey) {
            this.parentMap[section.key] = parentKey
          }
          if (section.children) {
            buildParentMap(section.children, section.key)
          }
        })
      }
      this.parentMap = {}
      buildParentMap(sections)
    },
    findSectionByKey(key: string): Section | null | undefined {
      const findRecursively = (sections: Section[]): Section | null | undefined => {
        for (const section of sections) {
          if (section.key === key) {
            return section
          }
          if (section.children) {
            const found = findRecursively(section.children)

            if (found) {
              return found
            }
          }
        }
        return null
      }
      return findRecursively(this.sections)
    },
    swapSections(key1: string, key2: string) {
      const parentKey1 = this.parentMap[key1]
      const parentKey2 = this.parentMap[key2]

      if (parentKey1 && parentKey2) {
        const parentSection1 = this.findSectionByKey(parentKey1)
        const parentSection2 = this.findSectionByKey(parentKey2)

        if (parentSection1 && parentSection2) {
          const index1 = parentSection1.children?.findIndex(child => child.key === key1) ?? -1
          const index2 = parentSection2.children?.findIndex(child => child.key === key2) ?? -1

          if (index1 !== -1 && index2 !== -1) {
            const child1 = parentSection1.children?.[index1]
            const child2 = parentSection2.children?.[index2]

            if (child1 && child2) {
              [parentSection1.children![index1], parentSection2.children![index2]] = [child2, child1]
            }
          }
        }
      }
      else {
        const index1 = this.sections.findIndex(section => section.key === key1)
        const index2 = this.sections.findIndex(section => section.key === key2)

        if (index1 !== -1 && index2 !== -1) {
          const section1 = this.sections[index1]
          const section2 = this.sections[index2]

          if (section1 && section2) {
            [this.sections[index1], this.sections[index2]] = [section2, section1]
          }
        }
      }
    },
    hasParent(key: string): boolean {
      return key in this.parentMap
    },
    toggleMinimize() {
      this.dialogMinimized = !this.dialogMinimized
    },
    toggleEditingMode() {
      this.isEditingMode = !this.isEditingMode
    },
    clear() {
      this.sections = []
      this.statuses = defaultStatus
      this.configLoaded = false
    },
  },
  getters: {
    duplicateProjects(state): { sections: string[], keys: string[] } {
      const sections: string[] = []
      const keys: string[] = []

      const checkDuplicates = (nodes: Section[]) => {
        nodes.forEach((node) => {
          sections.push(node.name)
          keys.push(node.key ?? '')

          if (node.children) {
            checkDuplicates(node.children)
          }
        })
      }

      checkDuplicates(state.sections)

      return {
        sections: sections.filter((item, index) => sections.indexOf(item) !== index),
        keys: keys.filter((item, index) => keys.indexOf(item) !== index),
      }
    },
  },
})
