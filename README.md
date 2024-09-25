## OneSignal Sign Up Examples

### Prerequisite

First, install the dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

### Setting up your OneSignal Account

You can enable SMS double opt in through following the guides [here](https://documentation.onesignal.com/docs/sms-opt-in-and-collection).


You can set your desired OneSignal App Id through the input on the main page. The App Id can be accessed from the `Settings > Keys and Ids` from the side panel.

You will want to make sure the following settings are off for the purposes of using the demos
- Identity Verification for email + external_id
- Require authentication for API notifications


### Security and best Practices

These code examples are provided illustrate Sign Up flows but the code should not be copied directly. Rather it should be used to illustrate what patterns you should use when developing your own Sign Up flows. We recommend using a backend to actually dispatch the API requests so that Identity verification and Authentication can be enabled.

