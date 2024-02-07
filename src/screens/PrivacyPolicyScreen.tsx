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
      <Text>
        {"\n"}
        <Heading> Privacy Policy for [Your App Name]</Heading>
        {"\n\n"}
        {
          "At [Your App Name], accessible from [Your App URL], one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by [Your App Name] and how we use it."
        }
        {"\n\n"}
        {
          "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us."
        }
        {"\n\n"}
        {
          "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in [Your App Name]. This policy is not applicable to any information collected offline or via channels other than this website."
        }
        {"\n\n"}
        {"Consent"}
        {"\n"}
        {"By using our website, you hereby consent to our Privacy Policy and agree to its terms."}
        {"\n\n"}
        {"Information we collect"}
        {"\n"}
        {
          "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information."
        }
        {"\n\n"}
        {"How we use your information"}
        {"\n"}
        {"We use the information we collect in various ways, including to:"}
        {"\n"}
        {"Provide, operate, and maintain our website"}
        {"\n"}
        {"Improve, personalize, and expand our website"}
        {"\n"}
        {"Understand and analyze how you use our website"}
        {"\n"}
        {"Develop new products, services, features, and functionality"}
        {"\n"}
        {
          "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes"
        }
        {"\n"}
        {"Send you emails"}
        {"\n"}
        {"Find and prevent fraud"}
        {"\n\n"}
        {"Log Files"}
        {"\n"}
        {
          "[Your App Name] follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."
        }
        {"\n\n"}
        {"Cookies and Web Beacons"}
        {"\n"}
        {
          "Like any other website, [Your App Name] uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."
        }
        {"\n\n"}
        {"Advertising Partners Privacy Policies"}
        {"\n"}
        {
          "You may consult this list to find the Privacy Policy for each of the advertising partners of [Your App Name]."
        }
        {"\n\n"}
        {
          "Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on [Your App Name], which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit."
        }
        {"\n\n"}
        {
          "Note that [Your App Name] has no access to or control over these cookies that are used by third-party advertisers."
        }
        {"\n\n"}
        {"Third Party Privacy Policies"}
        {"\n"}
        {
          "[Your App Name]'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options."
        }
        {"\n\n"}
        {
          "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites."
        }
        {"\n\n"}
        {"Children's Information"}
        {"\n"}
        {
          "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity."
        }
        {"\n\n"}
        {
          "[Your App Name] does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records."
        }
        {"\n\n"}
        {"Online Privacy Policy Only"}
        {"\n"}
        {
          "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in [Your App Name]. This policy is not applicable to any information collected offline or via channels other than this website."
        }
        {"\n\n"}
        {"Consent"}
        {"\n"}
        {"By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."}
        {"\n"}
      </Text>
    </ScrollView>
  );
};
