# Your React Native Bread & Butter

### Purpose of the workshop:

_We use basic view components to construct more complex user experiences on a daily basis. When moving to React Native, one might wonder… where’s my `UILabel`? `UIButton`, and good ol’ `UICollectionView`? This workshop covers a few of your every day components and how to style them using CSS._

### Final outcome:

We’ll be making a list of bread items which you could add to basket, if you’d be doing your groceries. Also, to inspire users we include  a range of “recipes” you can make with all this delicious bread. 

(img)

## Setup

Download the [project from GitHub](), and open the first folder: `BreadButter_1_start`. Let’s get that up and running:

1. `cd` into `BreadButter_1_start`
2. run `yarn install`
3. run `yarn start`
4. open the Xcode project, located in `App`
5. run onto iPhone 8 simulator 
6. check everything is 👌

You should now be seeing a little list with a few types of bread, like Sourdough and Rye. 

Unlike iOS, where `UITableView` contains basic styling and padding, `FlatList` (which is what’s being used) leaves this up to you. 

So let’s go from A to B:

## Create a new component

You can see that `FlatList` in `App.tsx` is just returning a `<Text>` component for each item. `Text` is a lot like `UILabel`, minus all the default padding 😉. 

We definitely want to use `Text`, but we need to add more information, layout, and also an Add (to basket) button. 

First things first, this cell should have its own class / component then. So let’s create `BreadItem.tsx`. 

You have your default imports at the top, `React` and any components you need from `react-native`. In this case, that’s `Text`. 

Then, because we like types, we define what information is contained in a Bread Item, and how we’ll be using it. If you peek at the JSON, you’ll have seen the structure, but otherwise go ahead and add this prop type declaration:

```
interface BreadProps {
  bread: {
	name: string
	price: string
	bakery: string
	img: string
  }
}
```

Great.

Now, for the new component itself:

```
export default class BreadItem extends React.Component<BreadProps> { 
render() {
return <Text>{this.props.bread.name}</Text>
}
}
```

Then, over in `App.tsx`, we’ll need to make sure we’re using `BreadItem` , so you can import it at the top (`import BreadItem from "./Components/BreadItem" `) and then update `FlatList` to return a BreadItems, with the right props: 

```
<FlatList data={breads}
	 renderItem={({ item }) => <BreadItem bread={item} />} />
```

When you reload in the simulator (`⌘R`), you should see that things are… exactly the same! This is great!

## Putting together our Bread Item card 

Now, let’s add that extra richness and design to each of our breads. 

We can use this stripped down design to dictate our elements and positioning:
cell_image_

Now, we want to nest our elements within `<View>`s, because can apply container styles to these views, which allow us to float all components around exactly how we want them. 

_viewhierarchy_

So, that ends up like:

```
	  <View>
		<Image source={{ uri: "myurl" }} />
		<View>
		  <View>
			<Text>{this.props.bread.name}</Text>
			<Text>{this.props.bread.bakery}</Text>
		  </View>
		  <View>
			<Text>{this.props.bread.price}</Text>
			 {/* <AddButton /> */}
		  </View>
		</View>
	  </View>
```

Make sure to import the elements, as you go along:

`import {Image, Text, View } from "react-native"`

## Adding style

`import { StyleSheet, Image, Text, View } from "react-native”`

At the bottom of the file, we’ll create one `styles` constant, which is a dictionary of styles, essentially. 

```
const styles = StyleSheet.create({
  container: {
	// CSS goes here
  },
})
```

### Text

```
const styles = StyleSheet.create({
  container: {
  },
  breadTitle: {
	fontWeight: "bold",
	fontSize: 14,
  },
  bakeryPriceTitle: {
	fontWeight: "300",
	fontSize: 14,
  },
 })
```

Add them to our elements like so:

```
	<View>
		<Image source={{ uri: "myurl" }} />
		<View>
		  <View>
			<Text style={styles.breadTitle}>{this.props.bread.name}</Text>
			<Text style={styles.bakeryPriceTitle}>{this.props.bread.bakery}</Text>
		  </View>
		  <View>
			<Text style={styles.bakeryPriceTitle}>{this.props.bread.price}</Text>
			{/* <AddButton /> */}
		  </View>
		</View>
	  </View>
```

### Background colours, margins, and padding

Over in `App.tsx`, you will add a background colour and some padding:

```
const styles = StyleSheet.create({
  container: {
	paddingTop: 30,
	backgroundColor: "#e5e5e5",
  },
})
```

and then attach it to the `View` like so:

```
<View style={styles.container}>
	<FlatList
	  data={breads}
	  renderItem={({ item }) => <BreadItem bread={item} />}
	/>
</View>
```

Back in our `BreadItem.tsx`, we are going to fill out the container style also:

```
const styles = StyleSheet.create({
  container: {
	height: 160,
	backgroundColor: "#FFFFFF",
	marginBottom: 10,
  },
  breadTitle: {
	fontWeight: "bold",
	fontSize: 14,
  },
  bakeryPriceTitle: {
	fontWeight: "300",
	fontSize: 14,
  },
})
```

### Flexbox

Right. Now we’ve we’ve got cards, and we’re going to lay the items out. Remember this view structure? We represented this in the JSX, but not yet with styling, so it’s visible to the user. 

The way to make this happen is through Flexbox.

Explain flexbox a little

Rows, and columns, justifycontent, and alignitems.
space between

```
const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: "row",
	height: 160,
	backgroundColor: "#FFFFFF",
	marginBottom: 10,
  },
  metadataContainer: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "space-between",
  },
  topContainer: {
	// more later, don't worry ;)
  },
  bottomContainer: {
	// more later, don't worry ;)
  },
  breadTitle: {
	fontWeight: "bold",
	fontSize: 14,
  },
  bakeryPriceTitle: {
	fontWeight: "300",
	fontSize: 14,
  },
})
```

### Images 

overflow hidden => like clips to bounds
resizeMode => similar to what you had on UIImage
set the height and width in styles
URI is an object

code:
```
	  <View style={styles.container}>
		<Image source={{ uri: this.props.bread.img }} resizeMode="stretch" style={styles.imageStyle} />
		<View style={styles.metadataContainer}>
		  <View style={styles.topContainer}>
			<Text style={styles.breadTitle}>{this.props.bread.name}</Text>
			<Text style={styles.bakeryPriceTitle}>{this.props.bread.bakery}</Text>
		  </View>
		  <View style={styles.bottomContainer}>
			<Text style={styles.bakeryPriceTitle}>{this.props.bread.price}</Text>
			{/* <AddButton /> */}
		  </View>
		</View>
	  </View>

const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: "row",
	height: 160,
	backgroundColor: "#FFFFFF",
	marginBottom: 10,
	overflow: "hidden",
  },
  metadataContainer: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "space-between",
	paddingTop: 20,
	paddingLeft: 20,
  },
  topContainer: {
  },
  bottomContainer: {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
	paddingBottom: 20,
  },
  breadTitle: {
	fontWeight: "bold",
	fontSize: 14,
  },
  bakeryPriceTitle: {
	fontWeight: "300",
	fontSize: 14,
  },
  imageStyle: {
	width: 160,
	height: 160,
  },
})
```

### Buttons 

Now we’ll look at `AddButton.tsx`

```
export default class AddButton extends React.Component {
  render() {
	return (
	  <TouchableHighlight style={styles.button}>
		<Text style={styles.buttonText}>Add</Text>
	  </TouchableHighlight>
	)
  }
}
```

```
const styles = StyleSheet.create({
  button: {
	flex: 1,
	borderRadius: 2,
	backgroundColor: "#4D4B4B",
	alignItems: "center",
	justifyContent: "center",
  },
  buttonText: {
	fontWeight: "bold",
	fontSize: 14,
	color: "white",
  },
})
```

You need to add a containing view around the button. 

so this becomes:

```
export default class AddButton extends React.Component {
  render() {
	return (
	  <View style={styles.container}>
	  <TouchableHighlight style={styles.button}>
		<Text style={styles.buttonText}>Add</Text>
	  </TouchableHighlight>
	  </View>
	)
  }
}
```

```
const styles = StyleSheet.create({
  container: {
	height: 30,
	width: 90,
  },
  button: {
	flex: 1,
	borderRadius: 2,
	backgroundColor: "#4D4B4B",
	alignItems: "center",
	justifyContent: "center",
  },
  buttonText: {
	fontWeight: "bold",
	fontSize: 14,
	color: "white",
  },
})
```

### Flex-grow

So what’s happening now? `space-between` should be pushing these elements to the bottom. Let’s add a wonky background colour and see what’s going on.

Despite the button being the right size, the view still stretches to fill all available space. 

We can control this with flex grow, essentially by stretching the top one to be 3 times as big as the the other elements (in this case, the bottom one).

This is where that top container style comes in handy.

```
const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: "row",
	height: 160,
	backgroundColor: "#FFFFFF",
	marginBottom: 10,
	overflow: "hidden",
  },
  metadataContainer: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "space-between",
	paddingTop: 20,
	paddingLeft: 20,
  },
  topContainer: {
	flexGrow: 3,
  },
  bottomContainer: {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
	paddingBottom: 20,
  },
  breadTitle: {
	fontWeight: "bold",
	fontSize: 14,
  },
  bakeryPriceTitle: {
	fontWeight: "300",
	fontSize: 14,
  },
  imageStyle: {
	width: 160,
	height: 160,
  },
})
```

And this is what’s really going on:

blue & red image

So, once you remove the background colours again, you realise that the button and the text are top aligned rather than bottom aligned.

So, the final thing to add is `alignItems: "flex-end"` to the bottom container.

And final right padding. 

```
const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection: "row",
	height: 160,
	backgroundColor: "#FFFFFF",
	marginBottom: 10,
	overflow: "hidden",
  },
  metadataContainer: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "space-between",
	paddingTop: 20,
	paddingLeft: 20,
  },
  topContainer: {
	flexGrow: 3,
  },
  bottomContainer: {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
	alignItems: "flex-end",
	paddingBottom: 10,
	paddingRight: 10,
  },
  breadTitle: {
	fontWeight: "bold",
	fontSize: 14,
  },
  bakeryPriceTitle: {
	fontWeight: "300",
	fontSize: 14,
  },
  imageStyle: {
	width: 160,
	height: 160,
  },
})
```

Looking pretty dandy, doesn’t it!


##  Adding a horizontal card at top

Ok, now we’ll be adding the sliding recipes / feature banner at the top.

This is the third folder, where most placeholders have been created for you and we’ll just look at editing BreadList (we’ve migrated it over from `App.tsx`, because now we have a list for buyable items that we might want to turn into a view controller at some point, rather than being the whole app).

`FlatList` has the ability to add a header component, so we’ll need to create our header separately. 

```
export default class BreadList extends React.Component {
  render() {
	const RecipeHeader = (
	  <FlatList
		data={recipes}
		renderItem={({ item }) => <RecipeItem recipe={item} />}
		horizontal={true}
		style={styles.recipeList}
	  />
	)
	return (
	  <View style={styles.container}>
		<FlatList
		  data={breads}
		  renderItem={({ item }) => <BreadItem bread={item} />}
		  ListHeaderComponent={RecipeHeader}
		/>
	  </View>
	)
  }
}
```

we set the `horizontal` property to true, as this list scrolls from left to right. And then you can set the `FlatList` in its entirety to the existing list, as a `ListHeaderComponent`.

### Pagination

Firstly, when you scroll around, you notice the scroll indicators appearing, which can easily be turned off by using: `showsHorizontalScrollIndicator={false}`.

Then, instead of scrolling, we want to be able to flick to the next card and have it rest and center that item nicely.

There is `pagingEnabled` which one can set to true, but that works for content that is the same size as the screen. Seeing as the cards are a little smaller, we’ll work with the ability to snap to items. 
```

	  <FlatList
		data={recipes}
		renderItem={({ item }) => <RecipeItem recipe={item} />}
		horizontal={true}
		style={styles.recipeList}
		showsHorizontalScrollIndicator={false}
		decelerationRate={0}
		snapToAlignment="center"
		snapToInterval={365}
		contentInset={{
		  top: 0,
		  left: 5,
		  bottom: 0,
		  right: 5,
		}}
	  />
```

Snap to interval, 365, because there’s 5 inset on each side (=10), detract from the width of the screen, 375 (though you can get the window dimensions too ofc!). You add the insets, and boom. bobs your uncle!

You will need to set the decelerationRate to 0. because otherwise it will misalign, and not snap properly. 

## That’s it folks