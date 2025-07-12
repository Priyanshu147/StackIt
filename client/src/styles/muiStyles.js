import { makeStyles } from '@material-ui/core/styles';

export const useBodyStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
    },
  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    leftPortion: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        marginRight: theme.spacing(1),
      },
    },
    logo: {
      fontFamily: 'Montserrat, sans-serif',
      textTransform: 'none',
      fontSize: '1.4rem',
      fontWeight: 600,
      padding: theme.spacing(0.5, 1),
      color: theme.palette.primary.main,
    },
    contentContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
      padding: theme.spacing(0, 3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 1),
      },
    },
    appBar: {
      borderTop: `4px solid ${theme.palette.primary.main}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: theme.palette.background.paper,
    },
    searchBar: {
      flexGrow: 0.6,
      maxWidth: '600px',
      [theme.breakpoints.down('md')]: {
        flexGrow: 0.8,
      },
      [theme.breakpoints.down('xs')]: {
        flexGrow: 1,
        margin: theme.spacing(0, 1),
      },
    },
    searchBtn: {
      padding: theme.spacing(1),
      minWidth: 'auto',
    },
    iconBtn: {
      padding: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0.5),
      },
    },
  }),
  { index: 1 }
);

export const useMenuStyles = makeStyles(
  (theme) => ({
    menuIcon: {
      marginRight: theme.spacing(1),
      fontSize: '1.4rem',
    },
    closeIcon: {
      boxSizing: 'border-box',
      border: `1px solid ${theme.palette.primary.main}60`,
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5),
    },
    rootPanel: {
      position: 'sticky',
      top: '64px',
      display: 'flex',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    list: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 1),
    },
    madeByItem: {
      padding: theme.spacing(1, 2, 0.5, 2),
    },
    userBtn: {
      textTransform: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      padding: theme.spacing(1, 2),
      borderRadius: theme.spacing(1),
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}10`,
      },
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      borderRadius: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
      },
    },
    moreBtn: {
      padding: theme.spacing(1),
      minWidth: 'auto',
    },
    userBtnMob: {
      padding: theme.spacing(1),
    },
  }),
  { index: 1 }
);

export const useQuesListStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      },
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 1),
      },
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    btnGroupWrapper: {
      display: 'flex',
      gap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      marginBottom:'8px',
    },
    loadBtnWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4),
    },
    loadBtn: {
      minWidth: '200px',
      padding: theme.spacing(1.5, 3),
    },
    noQuesText: {
      textAlign: 'center',
      marginTop: theme.spacing(8),
      color: theme.palette.text.secondary,
    },
  }),
  { index: 1 }
);

export const useRightSidePanelStyles = makeStyles(
  (theme) => ({
    rootPanel: {
      position: 'sticky',
      top: '80px',
      display: 'flex',
      minHeight: '200px',
      padding: theme.spacing(0, 2),
    },
    content: {
      paddingTop: 0,
      marginTop: theme.spacing(2),
    },
    tagsColumn: {
      border: `1px solid ${theme.palette.primary.main}30`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: `${theme.palette.primary.main}05`,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    tagsWrapper: {
      marginTop: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: theme.spacing(1),
    },
  }),
  { index: 1 }
);

export const useQuesCardStyles = makeStyles(
  (theme) => ({
    root: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      display: "flex",
      padding: theme.spacing(3, 2), // Increased horizontal padding for better spacing.
      borderRadius: 0,
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: theme.palette.action.hover, // Standard Material-UI hover color.
        boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.05)`, // Subtle shadow on hover.
      },
      "&:last-child": {
        borderBottom: "none",
      },
      boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.02)`, // Default subtle shadow for card-like feel.
    },
    infoWrapper: {
      width: "120px",
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(1),
      // backgroundColor: theme.palette.action.selected, // Light background for visual separation.
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(2), // Space between info and details.
      flexShrink: 0, // Prevent shrinking on smaller screens.
      [theme.breakpoints.down("sm")]: {
        width: "100px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "80px",
        padding: theme.spacing(0.5),
      },
    },
    mainText: {
      fontSize: "1.2rem", // Slightly larger for emphasis.
      fontWeight: 700, // Bolder for key numbers.
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    title: {
      fontSize: "1.35rem", // Slightly larger title for prominence.
      fontWeight: 600,
      wordWrap: "break-word",
      textDecoration: "none",
      color: theme.palette.text.primary,
      lineHeight: 1.4,
      marginBottom: theme.spacing(1),
      "&:hover": {
        color: theme.palette.primary.main,
      },
      transition: "color 0.2s ease",
    },
    innerInfo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(0.5),
    },
    quesDetails: {
      paddingLeft: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      gap: theme.spacing(2),
    },
    tagsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(1),
    },
    tag: {
      fontSize: "0.75rem",
      padding: theme.spacing(0.5, 1),
      border: `1px solid ${theme.palette.divider}`, // Subtle border for tags.
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper, // Ensure tags have a background.
    },
    bottomWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: theme.spacing(1),
      marginTop: theme.spacing(1), // Add some top margin.
    },
    byUserWrapper: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
    filledByUser: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
      backgroundColor: `${theme.palette.primary.main}08`,
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.primary.main}20`,
    },
    homeAvatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      borderRadius: theme.spacing(0.5),
    },
    quesAnsAvatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      borderRadius: theme.spacing(0.5),
    },
  }),
  { index: 1 },
)

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      padding: 0,
      overflow: 'hidden',
      borderRadius: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        margin: theme.spacing(1),
      },
    },
    menuIcon: {
      marginRight: theme.spacing(1),
      fontSize: '1.4rem',
    },
    upDownIcon: {
      color: theme.palette.text.secondary,
      fontSize: '2rem',
      transition: 'color 0.2s ease',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  }),
  { index: 1 }
);

export const useAuthFormStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(3),
      maxWidth: '400px',
      margin: '0 auto',
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      },
    },
    inputField: {
      marginBottom: theme.spacing(3),
    },
    submitButton: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(1.5, 3),
      fontSize: '1rem',
      fontWeight: 600,
    },
    titleLogo: {
      display: 'block',
      width: '80px',
      height: '80px',
      margin: `0 auto ${theme.spacing(3)}px auto`,
    },
    footerText: {
      marginTop: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    link: {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      textDecoration: 'none',
      fontWeight: 500,
      '&:hover': {
        color: theme.palette.secondary.main,
        textDecoration: 'underline',
      },
    },
  }),
  { index: 1 }
);

export const useTagsPageStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 3),
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      },
    },
    titleText: {
      marginBottom: theme.spacing(3),
      fontSize: '2rem',
      fontWeight: 600,
    },
    filterInput: {
      marginTop: theme.spacing(3),
      maxWidth: '400px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    tagsWrapper: {
      marginTop: theme.spacing(3),
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: theme.spacing(2),
    },
    tagBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: `${theme.palette.primary.main}03`,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
    tag: {
      marginBottom: theme.spacing(2),
    },
  }),
  { index: 1 }
);

export const useUsersPageStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 3),
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      },
    },
    filterInput: {
      marginTop: theme.spacing(3),
      maxWidth: '400px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    usersWrapper: {
      marginTop: theme.spacing(4),
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: theme.spacing(2),
    },
    userBox: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}05`,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
    },
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(2),
      borderRadius: theme.spacing(0.5),
    },
  }),
  { index: 1 }
);

export const useQuesPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      padding: theme.spacing(2, 3),
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
    titleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    quesInfo: {
      display: 'flex',
      gap: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
      fontSize: '0.9rem',
    },
    content: {
      paddingTop: theme.spacing(2),
      width: '100%',
      paddingBottom: theme.spacing(3),
    },
    quesAnsWrapper: {
      display: 'flex',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    voteColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: '60px',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
    quesBody: {
      padding: theme.spacing(2, 3),
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1.5),
      },
    },
    tag: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    tagsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(2),
      gap: theme.spacing(1),
    },
    bottomWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing(3),
      gap: theme.spacing(2),
    },
    bottomBtns: {
      padding: theme.spacing(0.5, 1),
    },
    commentWrapper: {
      padding: theme.spacing(1, 0),
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(2),
    },
    commentBtns: {
      padding: theme.spacing(0.5),
      minWidth: 'auto',
    },
    smallForm: {
      marginTop: theme.spacing(2),
    },
    submitCancelBtns: {
      display: 'flex',
      gap: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    answersWrapper: {
      marginTop: theme.spacing(4),
    },
    answerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(0, 1),
    },
    acceptIcon: {
      color: theme.palette.text.secondary,
      fontSize: '2rem',
      transition: 'color 0.2s ease',
    },
    checkedAcceptIcon: {
      color: '#10b981',
      fontSize: '2rem',
    },
    answerWrapper: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    },
    answerForm: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    },
    footerText: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      display: 'flex',
      alignItems: 'flex-start',
      gap: theme.spacing(1),
    },
    footerTag: {
      marginRight: theme.spacing(1),
    },
  }),
  { index: 1 }
);

export const useUserPageStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 4),
      width: '100%',
      display: 'flex',
      gap: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: theme.spacing(0, 2),
        gap: theme.spacing(3),
      },
    },
    userCard: {
      backgroundColor: `${theme.palette.primary.main}08`,
      padding: theme.spacing(3),
      minHeight: '300px',
      textAlign: 'center',
      borderRadius: theme.spacing(2),
      border: `1px solid ${theme.palette.primary.main}20`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        minHeight: 'auto',
        padding: theme.spacing(2),
      },
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      borderRadius: theme.spacing(1),
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      [theme.breakpoints.down('md')]: {
        width: theme.spacing(15),
        height: theme.spacing(15),
      },
    },
    cardText: {
      marginTop: theme.spacing(1),
    },
    infoCard: {
      flex: 1,
      padding: theme.spacing(0, 2),
    },
    userInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: theme.spacing(3),
      gap: theme.spacing(2),
    },
    bigText: {
      fontSize: '2rem',
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
      },
    },
    smallText: {
      fontSize: '0.9rem',
      color: theme.palette.text.secondary,
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.8rem',
      },
    },
    statsBar: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(3),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.divider}`,
    },
    recentActivity: {
      marginTop: theme.spacing(3),
    },
    recentQuesAns: {
      display: 'flex',
      padding: theme.spacing(2, 0),
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      gap: theme.spacing(2),
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    votesTitleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      flex: 1,
    },
    votes: {
      padding: theme.spacing(0.5, 1),
      border: `1px solid ${theme.palette.primary.main}30`,
      borderRadius: theme.spacing(0.5),
      backgroundColor: `${theme.palette.primary.main}05`,
      fontSize: '0.9rem',
      fontWeight: 600,
      minWidth: '40px',
      textAlign: 'center',
    },
    title: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      fontSize: '1rem',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      transition: 'color 0.2s ease',
    },
  }),
  { index: 1 }
);

export const useAskQuesPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 3),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
      },
    },
    quesForm: {
      paddingTop: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(2),
      padding: theme.spacing(4),
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    inputWrapper: {
      marginBottom: theme.spacing(4),
    },
    inputField: {
      marginTop: theme.spacing(1),
    },
    submitBtn: {
      padding: theme.spacing(1.5, 4),
      fontSize: '1rem',
      fontWeight: 600,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    tag: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
  { index: 1 }
);

export const useVoteBtnsStyles = makeStyles(
  (theme) => ({
    icon: {
      color: theme.palette.text.secondary,
      fontSize: '2rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        color: theme.palette.primary.main,
        transform: 'scale(1.1)',
      },
    },
    checkedIcon: {
      color: theme.palette.primary.main,
      fontSize: '2rem',
    },
  }),
  { index: 1 }
);

export const useAlertStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      margin: theme.spacing(2, 0),
    },
  }),
  { index: 1 }
);

export const useNotFoundPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(2),
      padding: theme.spacing(0, 3),
    },
    textWrapper: {
      marginTop: '15vh',
      textAlign: 'center',
      padding: theme.spacing(4),
    },
    icon: {
      fontSize: '6rem',
      marginBottom: theme.spacing(2),
      color: theme.palette.primary.main,
    },
  }),
  { index: 1 }
);