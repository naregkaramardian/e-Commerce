import React from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import { updateCollections } from "../../redux/shop/shop.actions"
import CollectionPage from "../collection/collection.component"
import CollectionOverview from "../../components/collections-overview/collections-overview.components"
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils"
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null
  componentDidMount() {

    const {updateCollections} = this.props
    const collectionsRef = firestore.collection("collections")

    this.unsubscribeFromSnapshot = collectionsRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
    })
  }

  render() {
    const { match } = this.props
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
