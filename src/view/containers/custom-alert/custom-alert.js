import React, { Component } from 'react'
import { Text, View, Modal } from 'react-native'
import FastImage from 'react-native-fast-image'
import { LinearTextGradient } from 'react-native-text-gradient'
import { Button } from 'native-base'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//constants
import styles from './styles'
import { ICONS } from '../../../constants/icons'
import Blur from '../blur/blur'

class CustomAlert extends Component {
	render() {
		return (
			<Modal animationType='fade' transparent={true} visible={this.props.visible} onRequestClose={() => {}}>
				<Blur />
				<View style={styles.content}>
					<View style={this.props.datepicker ? styles.big_content_inner : styles.content_inner}>
						<View style={styles.cross_view}>
							<Button
								transparent
								style={styles.cross_button}
								onPress={() => this.props.decline_btn_handler()}
							>
								<FastImage
									resizeMode={FastImage.resizeMode.contain}
									style={styles.cross}
									source={{ uri: ICONS.COMMON.CLOSE }}
								/>
							</Button>
						</View>
						<View style={styles.modal_title}>
							<Text style={styles.modal_title_text}>{this.props.title}</Text>
							{this.props.subtitle && (
								<LinearTextGradient
									locations={[0, 1]}
									colors={[
										this.props.userColor.first_gradient_color,
										this.props.userColor.second_gradient_color,
									]}
									start={{ x: 0.0, y: 1.0 }}
									end={{ x: 1.0, y: 1.0 }}
									style={styles.modal_title_text}
								>
									{this.props.subtitle}
								</LinearTextGradient>
							)}
						</View>
						{this.props.second_btn_title ? (
							<View style={styles.modal_buttons}>
								<Button
									transparent
									style={styles.fisrt_small_btn}
									onPress={() => this.props.first_btn_handler()}
								>
									<LinearTextGradient
										locations={[0, 1]}
										colors={[
											this.props.userColor.first_gradient_color,
											this.props.userColor.second_gradient_color,
										]}
										start={{ x: 0.0, y: 1.0 }}
										end={{ x: 1.0, y: 1.0 }}
										style={styles.alert_text}
									>
										{this.props.first_btn_title}
									</LinearTextGradient>
								</Button>
								<Button
									transparent
									style={styles.second_small_btn}
									onPress={() => this.props.second_btn_handler()}
								>
									<Text style={styles.alert_text}>{this.props.second_btn_title}</Text>
								</Button>
							</View>
						) : (
							<View style={styles.modal_buttons}>
								<Button
									transparent
									style={styles.big_centered_button}
									onPress={() => {
										this.props.first_btn_handler()
									}}
								>
									{this.props.subtitle ? (
										<LinearTextGradient
											locations={[0, 1]}
											colors={[
												this.props.userColor.first_gradient_color,
												this.props.userColor.second_gradient_color,
											]}
											start={{ x: 0.0, y: 1.0 }}
											end={{ x: 1.0, y: 1.0 }}
											style={styles.alert_text}
										>
											{this.props.first_btn_title}
										</LinearTextGradient>
									) : (
										<Text style={styles.alert_text}>{this.props.first_btn_title}</Text>
									)}
								</Button>
							</View>
						)}
					</View>
				</View>
			</Modal>
		)
	}
}
const mapStateToProps = (state) => ({
	userColor: state.userColor,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(CustomAlert)
