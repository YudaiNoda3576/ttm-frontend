// Imports
import { kebabCase } from 'lodash'

export function layout (layout = 'Default', children, path = '') {
  const dir = kebabCase(layout)

  return {
    children,
    component: () => import(
      /* webpackChunkName: "layout-[request]" */
      `@/layouts/${dir}/Index`
    ),
    path,
  }
}

export function route (name, component, path = '', publishingSettings) {
  component = Object(component) === component
    ? component
    : { default: name.replace(' ', '') }

  const components = {}

  for (const [key, value] of Object.entries(component)) {
    components[key] = () => import(
      /* webpackChunkName: "views-[request]" */
      `@/views/${value}`
    )
  }
  const meta = {isPublic: publishingSettings}

  return {
    name,
    components,
    path,
    meta
  }
}
