<?php
/**
 * Lucide icon registry extracted verbatim from the html-layout source.
 *
 * @package WpPanda
 */

defined( 'ABSPATH' ) || exit;

/** Return the registry of icons used across the supplied layouts. */
function wpp_icons() {
	static $icons = null;
	if ( null !== $icons ) {
		return $icons;
	}
	$icons = array(
	'arrow-left' => array( 'stroke' => '2', 'paths' => '<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>' ),
	'arrow-right' => array( 'stroke' => '2', 'paths' => '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>' ),
	'arrow-up-right' => array( 'stroke' => '2', 'paths' => '<path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>' ),
	'badge-check' => array( 'stroke' => '2', 'paths' => '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m16 9-5.5 5.5L8 12"></path>' ),
	'bell' => array( 'stroke' => '2', 'paths' => '<path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>' ),
	'book-open' => array( 'stroke' => '2', 'paths' => '<path d="M12 5v16"></path><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"></path>' ),
	'bookmark' => array( 'stroke' => '2', 'paths' => '<path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"></path>' ),
	'calendar-check' => array( 'stroke' => '1.8', 'paths' => '<path d="M8 2v3"></path><path d="M16 2v3"></path><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="m9 15 2 2 4-4"></path>' ),
	'calendar-check@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="M8 2v3"> <path d="M16 2v3"> <rect x="3" y="3" width="18" height="18" rx="2"> <path d="M3 9h18"> <path d="m9 15 2 2 4-4">' ),
	'check' => array( 'stroke' => '3', 'paths' => '<path d="M20 6 9 17l-5-5"></path>' ),
	'check@2.5' => array( 'stroke' => '2.5', 'paths' => '<path d="M20 6 9 17l-5-5"> </path>' ),
	'check@3' => array( 'stroke' => '3', 'paths' => '<path d="M20 6 9 17l-5-5"> </path>' ),
	'check@3.5' => array( 'stroke' => '3.5', 'paths' => '<path d="M20 6 9 17l-5-5"> </path>' ),
	'chevron-down' => array( 'stroke' => '2', 'paths' => '<path d="m6 9 6 6 6-6"></path>' ),
	'chevron-left' => array( 'stroke' => '2', 'paths' => '<path d="m15 18-6-6 6-6"></path>' ),
	'chevron-right' => array( 'stroke' => '2', 'paths' => '<path d="m9 18 6-6-6-6"></path>' ),
	'circle-check' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="12" r="10"></circle><path d="m16 9-5.5 5.5L8 12"></path>' ),
	'circle-question-mark' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>' ),
	'clipboard-list' => array( 'stroke' => '1.8', 'paths' => '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path>' ),
	'clipboard-list@1.8' => array( 'stroke' => '1.8', 'paths' => '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"> </rect> <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"> </path> <path d="M12 11h4"> </path> <path d="M12 16h4"> </path> <path d="M8 11h.01"> </path> <path d="M8 16h.01"> </path>' ),
	'clock' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>' ),
	'code' => array( 'stroke' => '2', 'paths' => '<path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path>' ),
	'copy' => array( 'stroke' => '2', 'paths' => '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>' ),
	'credit-card' => array( 'stroke' => '2', 'paths' => '<rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line><path d="M6 14h2"></path>' ),
	'download' => array( 'stroke' => '2', 'paths' => '<path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path>' ),
	'expand' => array( 'stroke' => '2', 'paths' => '<path d="m15 15 6 6"></path><path d="m15 9 6-6"></path><path d="M21 16v5h-5"></path><path d="M21 8V3h-5"></path><path d="M3 16v5h5"></path><path d="m3 21 6-6"></path><path d="M3 8V3h5"></path><path d="M9 9 3 3"></path>' ),
	'eye' => array( 'stroke' => '2', 'paths' => '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle>' ),
	'file-text' => array( 'stroke' => '2', 'paths' => '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>' ),
	'gauge' => array( 'stroke' => '2', 'paths' => '<path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path>' ),
	'gift' => array( 'stroke' => '2', 'paths' => '<path d="M12 7v14"></path><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"></path><rect x="3" y="7" width="18" height="4" rx="1"></rect>' ),
	'globe' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>' ),
	'headphones' => array( 'stroke' => '2', 'paths' => '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>' ),
	'heart' => array( 'stroke' => '2', 'paths' => '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>' ),
	'house' => array( 'stroke' => '2', 'paths' => '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">' ),
	'images' => array( 'stroke' => '2', 'paths' => '<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"></path><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"></path><circle cx="13" cy="7" r="1" fill="currentColor"></circle><rect x="8" y="2" width="14" height="14" rx="2"></rect>' ),
	'info' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>' ),
	'key-round' => array( 'stroke' => '2', 'paths' => '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>' ),
	'languages' => array( 'stroke' => '1.8', 'paths' => '<path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path>' ),
	'languages@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="m5 8 6 6"> <path d="m4 14 6-6 2-3"> <path d="M2 5h12"> <path d="M7 2h1"> <path d="m22 22-5-10-5 10"> <path d="M14 18h6">' ),
	'layout-dashboard' => array( 'stroke' => '2', 'paths' => '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>' ),
	'layout-grid' => array( 'stroke' => '2', 'paths' => '<rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>' ),
	'life-buoy' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path><circle cx="12" cy="12" r="4"></circle>' ),
	'link-2' => array( 'stroke' => '2', 'paths' => '<path d="M9 17H7A5 5 0 0 1 7 7h2"></path><path d="M15 7h2a5 5 0 1 1 0 10h-2"></path><line x1="8" x2="16" y1="12" y2="12"></line>' ),
	'list' => array( 'stroke' => '2', 'paths' => '<path d="M3 5h.01"></path><path d="M3 12h.01"></path><path d="M3 19h.01"></path><path d="M8 5h13"></path><path d="M8 12h13"></path><path d="M8 19h13"></path>' ),
	'lock' => array( 'stroke' => '2', 'paths' => '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>' ),
	'lock-keyhole' => array( 'stroke' => '2', 'paths' => '<circle cx="12" cy="16" r="1"></circle><rect x="3" y="10" width="18" height="12" rx="2"></rect><path d="M7 10V7a5 5 0 0 1 10 0v3"></path>' ),
	'log-out' => array( 'stroke' => '2', 'paths' => '<path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>' ),
	'mail' => array( 'stroke' => '1.8', 'paths' => '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect>' ),
	'mail@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"> </path> <rect x="2" y="4" width="20" height="16" rx="2"> </rect>' ),
	'map-pin' => array( 'stroke' => '2', 'paths' => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle>' ),
	'menu' => array( 'stroke' => '2', 'paths' => '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>' ),
	'monitor-play' => array( 'stroke' => '2', 'paths' => '<path d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"></path><path d="M12 17v4"></path><path d="M8 21h8"></path><rect x="2" y="3" width="20" height="14" rx="2"></rect>' ),
	'newspaper' => array( 'stroke' => '2', 'paths' => '<path d="M15 18h-5"> <path d="M18 14h-8"> <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"> <rect width="8" height="4" x="10" y="6" rx="1">' ),
	'package' => array( 'stroke' => '2', 'paths' => '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path>' ),
	'palette' => array( 'stroke' => '2', 'paths' => '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>' ),
	'paperclip' => array( 'stroke' => '2', 'paths' => '<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path>' ),
	'plug' => array( 'stroke' => '2', 'paths' => '<path d="M12 22v-5"></path><path d="M15 8V2"></path><path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"></path><path d="M9 8V2"></path>' ),
	'plus' => array( 'stroke' => '2', 'paths' => '<path d="M5 12h14"></path><path d="M12 5v14"></path>' ),
	'refresh-cw' => array( 'stroke' => '2', 'paths' => '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path>' ),
	'rocket' => array( 'stroke' => '1.8', 'paths' => '<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"></path><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"></path>' ),
	'rocket@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"> </path> <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"> </path> <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"> </path> <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"> </path>' ),
	'search' => array( 'stroke' => '2', 'paths' => '<path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle>' ),
	'share-2' => array( 'stroke' => '2', 'paths' => '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>' ),
	'shield' => array( 'stroke' => '1.8', 'paths' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>' ),
	'shield-check' => array( 'stroke' => '2', 'paths' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path>' ),
	'shield@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"> </path>' ),
	'shopping-bag' => array( 'stroke' => '2', 'paths' => '<path d="M16 10a4 4 0 0 1-8 0"></path><path d="M3.103 6.034h17.794"></path><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>' ),
	'shopping-cart' => array( 'stroke' => '1.8', 'paths' => '<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"></path><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"></path><circle cx="18" cy="20" r="2"></circle><circle cx="8" cy="20" r="2"></circle>' ),
	'shopping-cart@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"> </path> <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"> </path> <circle cx="18" cy="20" r="2"> </circle> <circle cx="8" cy="20" r="2"> </circle>' ),
	'sliders-horizontal' => array( 'stroke' => '2', 'paths' => '<path d="M10 5H3"></path><path d="M12 19H3"></path><path d="M14 3v4"></path><path d="M16 17v4"></path><path d="M21 12h-9"></path><path d="M21 19h-5"></path><path d="M21 5h-7"></path><path d="M8 10v4"></path><path d="M8 12H3"></path>' ),
	'star' => array( 'stroke' => '2', 'paths' => '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>' ),
	'thumbs-down' => array( 'stroke' => '2', 'paths' => '<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path><path d="M17 14V2"></path>' ),
	'thumbs-up' => array( 'stroke' => '2', 'paths' => '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path><path d="M7 10v12"></path>' ),
	'ticket' => array( 'stroke' => '2', 'paths' => '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path>' ),
	'timer' => array( 'stroke' => '2', 'paths' => '<line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle>' ),
	'trash' => array( 'stroke' => '2', 'paths' => '<path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' ),
	'trending-up' => array( 'stroke' => '2', 'paths' => '<path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path>' ),
	'triangle-alert' => array( 'stroke' => '2', 'paths' => '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>' ),
	'undo-2' => array( 'stroke' => '2', 'paths' => '<path d="M9 14 4 9l5-5"></path><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"></path>' ),
	'unlink' => array( 'stroke' => '2', 'paths' => '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"></path><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"></path><line x1="8" x2="8" y1="2" y2="5"></line><line x1="2" x2="5" y1="8" y2="8"></line><line x1="16" x2="16" y1="19" y2="22"></line><line x1="19" x2="22" y1="16" y2="16"></line>' ),
	'user' => array( 'stroke' => '2', 'paths' => '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' ),
	'user-cog' => array( 'stroke' => '2', 'paths' => '<path d="M10 15H6a4 4 0 0 0-4 4v2"></path><path d="m14.305 16.53.923-.382"></path><path d="m15.228 13.852-.923-.383"></path><path d="m16.852 12.228-.383-.923"></path><path d="m16.852 17.772-.383.924"></path><path d="m19.148 12.228.383-.923"></path><path d="m19.53 18.696-.382-.924"></path><path d="m20.772 13.852.924-.383"></path><path d="m20.772 16.148.924.383"></path><circle cx="18" cy="15" r="3"></circle><circle cx="9" cy="7" r="4"></circle>' ),
	'users' => array( 'stroke' => '2', 'paths' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle>' ),
	'x' => array( 'stroke' => '2', 'paths' => '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>' ),
	'zap' => array( 'stroke' => '1.8', 'paths' => '<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"></path>' ),
	'zap@1.8' => array( 'stroke' => '1.8', 'paths' => '<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"> </path>' ),
	);
	return $icons;
}

/**
 * Render an inline SVG icon exactly as used by the layouts.
 *
 * @param string $name   Icon name from the registry.
 * @param string $class  Extra classes for the svg tag.
 * @param array  $attrs  Optional overrides: stroke, style.
 */
function wpp_icon( $name, $class = '', $attrs = array() ) {
	$icons = wpp_icons();
	if ( ! isset( $icons[ $name ] ) ) {
		return '';
	}
	$stroke = isset( $attrs['stroke'] ) ? $attrs['stroke'] : $icons[ $name ]['stroke'];
	$style  = isset( $attrs['style'] ) ? ' style="' . esc_attr( $attrs['style'] ) . '"' : '';
	$class  = trim( 'lucide lucide-' . $name . ( $class ? ' ' . $class : '' ) );

	return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' . esc_attr( $stroke ) . '" stroke-linecap="round" stroke-linejoin="round" class="' . esc_attr( $class ) . '" aria-hidden="true"' . $style . '>' . $icons[ $name ]['paths'] . '</svg>';
}
