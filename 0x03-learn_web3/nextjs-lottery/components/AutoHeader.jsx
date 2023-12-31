import { ConnectButton } from "web3uikit"

const Header = () => {
	return (
		<div className="border-b-2 p-5 flex flex-row">
			<h2 className="p-4 font-bold text-3xl">
				decentralised lottery
			</h2>
			<div className="ml-auto py-2 px-4">
				<ConnectButton moralisAuth={false} />
			</div>
		</div>
	)
}

export default Header