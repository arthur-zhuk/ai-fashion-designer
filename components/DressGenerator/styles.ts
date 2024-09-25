import { Platform, StatusBar, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 0, // Remove top padding
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E0E0E0",
    marginBottom: 10,
    marginTop: 20,
    alignSelf: "flex-start",
    fontFamily: "Helvetica Neue, sans-serif",
  },
  styleList: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 5, // Add some padding at the bottom
  },
  keywordSection: {
    marginBottom: 20,
  },
  selectedKeywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  selectedKeyword: {
    backgroundColor: "#4A4A4A",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedKeywordText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Helvetica Neue, sans-serif",
  },
  generateButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: "#1A1A1A",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Helvetica Neue, sans-serif",
    letterSpacing: 0.5,
  },
  infoText: {
    color: "#E0E0E0",
    fontSize: 16,
    marginBottom: 15,
  },
  errorText: {
    color: "#FF6347",
    fontSize: 16,
    marginBottom: 15,
  },
  garmentName: {
    fontSize: 20, // Reduced from 24
    fontWeight: "600",
    color: "#E0E0E0",
    marginBottom: 15, // Reduced from 20
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Helvetica Neue, sans-serif",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    maxWidth: 500,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#4A4A4A",
    backgroundColor: "#2A2A2A",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  // Generated Images Gallery Styles
  generatedImageContainer: {
    position: "relative",
    marginRight: 15,
    marginBottom: 15,
  },
  thumbnailImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4A4A4A",
  },
  saveButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 8,
  },
  // Save Image Button in Main Area
  saveButtonMain: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: "90%",
    height: "70%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#D4AF37",
  },
  // Description Styles
  descriptionContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
  descriptionText: {
    fontSize: 14, // Reduced from 16
    color: "#E0E0E0",
    marginTop: 8, // Reduced from 10
    fontFamily: "Helvetica Neue, sans-serif",
    lineHeight: 20, // Reduced from 24
  },
  // Button Container Styles
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  // ... (any other existing styles)

  upgradeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#2A2A2A",
    borderRadius: 15,
  },
  upgradeText: {
    flex: 1,
    color: "#E0E0E0",
    fontSize: 16,
    marginRight: 15,
    fontFamily: "Helvetica Neue, sans-serif",
  },
  upgradeButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  upgradeButtonText: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Helvetica Neue, sans-serif",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  pinterestButton: {
    backgroundColor: "#BD081C",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  pinterestButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Helvetica Neue, sans-serif",
    marginLeft: 8,
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
});
