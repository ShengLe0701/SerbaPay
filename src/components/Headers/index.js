import headerFactory from './Header'
import CancelDoneHeader from './CancelDoneHeader'
import BaseHeader from './BaseHeader'

export const Header = config => (headerFactory({
    ...config,
}))

export const CancelHeader = config => (headerFactory({
    ...config,
    cancel: true
}))

export const LeftCancelHeader = config => (headerFactory({
    ...config,
    leftCancel: true
}))

export const factory = headerFactory

export {CancelDoneHeader}
export {BaseHeader}
