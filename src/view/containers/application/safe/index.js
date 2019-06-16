import React from 'react'
import { SafeAreaView } from 'react-native'
import styles from './styles'

type Props = {
	children: React.ReactChildren,
	color: string,
}

function Safe({ children, color = 'transparent' }: Props) {
	return <SafeAreaView style={[styles.layout, { backgroundColor: color }]}>{children}</SafeAreaView>
}

export default Safe
