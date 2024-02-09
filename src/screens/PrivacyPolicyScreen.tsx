import { StatusBar } from "expo-status-bar";
import { Box, Heading, Link, ScrollView, Text } from "native-base";
import { colors } from "styles/common";

export default function PrivacyPolicyScreen({ navigation, route }) {
  return (
    <Box flex={1} px={5} backgroundColor={colors.light.background}>
      <StatusBar style="dark" />
      <Box safeArea flex={1}>
        <Link onPress={() => navigation.navigate("FeedScreen")}>Back</Link>
        <PrivacyPolicyContent />
      </Box>
    </Box>
  );
}

const PrivacyPolicyContent = () => {
  return (
    <ScrollView>
      <Heading size="lg" mt={5} mb={3}>
        Privacy Policy for Game Buzz App
      </Heading>
      <Text>Effective Date: 09/02/2024</Text>
      <Text>
        Thank you for using Game Buzz, a React Native news feed app developed by Prilka. This Privacy Policy is designed
        to help you understand how your personal information is collected, used, and safeguarded when you use our mobile
        application.
      </Text>
      <Heading size="md" mt={5}>
        Information We Collect:
      </Heading>
      <Heading size="sm" mt={2}>
        1.User-Provided Information:
      </Heading>
      <Text pl={4}>
        - When you register an account, we collect your username, email address, and profile picture (if provided).{" "}
        {"\n"}- If you choose to leave comments or rate articles, we may collect the content of your comments and your
        article ratings.
      </Text>
      <Heading size="sm" mt={2}>
        2.Automatically Collected Information:
      </Heading>
      <Text pl={4}>
        - We gather information about your device, including device type, operating system, and device identifier.{" "}
        {"\n"}- We collect information about your use of the app, such as the articles you view, the comments you make,
        and your interactions with notifications.
      </Text>
      <Heading size="sm" mt={2}>
        3.Permissions:
      </Heading>
      <Text pl={4}>
        - The app requests and may collect information obtained through permissions like notifications and tracking
        transparency to enhance your user experience. {"\n"}
      </Text>
      <Heading size="sm" mt={2}>
        4.AppsFlyer:
      </Heading>
      <Text pl={4}>
        - For app conversion tracking, we use AppsFlyer. AppsFlyer collects information to help us understand the
        effectiveness of our marketing campaigns. Please refer to AppsFlyer's Privacy Policy for more details:
        <Link
          href={"https://www.appsflyer.com/legal/privacy-policy/"}
          _text={{
            color: "blue.700",
          }}
        >
          AppsFlyer Privacy Policy
        </Link>{" "}
        {"\n"}
      </Text>
      <Heading size="sm" mt={2}>
        5.Firebase:
      </Heading>
      <Text pl={4}>
        - Our backend is powered by Firebase, and it processes certain information on our behalf. Firebase's privacy
        practices are outlined in Google's Privacy Policy:
        <Link
          href={"https://policies.google.com/"}
          _text={{
            color: "blue.700",
          }}
        >
          Google Privacy & Terms
        </Link>{" "}
        {"\n"}
      </Text>
      <Heading size="md" mt={5}>
        How We Use Your Information:
      </Heading>
      <Heading size="sm" mt={2}>
        1.Provide and Personalize the App:
      </Heading>
      <Text pl={4}>- We use your information to provide, personalize, and improve your experience with Game Buzz.</Text>
      <Heading size="sm" mt={2}>
        2.Communicate with You:
      </Heading>
      <Text pl={4}>- We may send you notifications, updates, and important information related to the app.</Text>
      <Heading size="sm" mt={2}>
        2.Analytics and Marketing:
      </Heading>
      <Text pl={4}>
        - We use collected data for analytics and to measure the effectiveness of our marketing efforts.
      </Text>
      <Heading size="md" mt={5}>
        Sharing of Your Information:
      </Heading>
      <Text pl={4}>
        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
        except for the purposes stated in this Privacy Policy.
      </Text>
      <Heading size="md" mt={5}>
        Compliance with App Store Policies:
      </Heading>
      <Text pl={4}>Our privacy practices comply with the policies set forth by Google Play and Apple App Store.</Text>
      <Heading size="md" mt={5}>
        Security
      </Heading>
      <Text pl={4}>
        We take reasonable measures to protect your information from unauthorized access or disclosure.
      </Text>
      <Heading size="md" mt={5}>
        Changes to Privacy Policy
      </Heading>
      <Text pl={4}>
        We reserve the right to update our Privacy Policy to reflect changes in our practices. We encourage you to
        review this page periodically.
      </Text>
      <Heading size="md" mt={5}>
        Contact Us:
      </Heading>
      <Text>
        If you have any questions or concerns about our Privacy Policy, please contact us at [your contact email].{"\n"}
        By using Game Buzz, you agree to the terms outlined in this Privacy Policy.
      </Text>
    </ScrollView>
  );
};
