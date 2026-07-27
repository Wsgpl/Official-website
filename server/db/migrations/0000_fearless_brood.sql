CREATE TABLE `admin_sessions` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`token` varchar(128) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_sessions_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `admin_users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(160) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`name` varchar(120) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` varchar(36) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`title` varchar(255) NOT NULL,
	`excerpt` text NOT NULL,
	`body` text NOT NULL,
	`cover_image_path` varchar(500),
	`status` varchar(20) NOT NULL DEFAULT 'draft',
	`published_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(36) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`name` varchar(160) NOT NULL,
	`tagline` varchar(255) NOT NULL,
	`flight_time` varchar(50),
	`payload` varchar(50),
	`range` varchar(50),
	`applications` text,
	`image_path` varchar(500),
	`status` varchar(20) NOT NULL DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` varchar(36) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`source` varchar(32) NOT NULL,
	`name` varchar(120) NOT NULL,
	`email` varchar(160) NOT NULL,
	`phone` varchar(40),
	`company` varchar(120),
	`subject` varchar(120),
	`message` text NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'new',
	`notified` boolean NOT NULL DEFAULT false,
	CONSTRAINT `submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` varchar(36) NOT NULL,
	`submission_id` varchar(36) NOT NULL,
	`original_filename` varchar(255) NOT NULL,
	`stored_path` varchar(500) NOT NULL,
	`mime_type` varchar(100) NOT NULL,
	`size_bytes` bigint NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `admin_sessions` ADD CONSTRAINT `admin_sessions_user_id_admin_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `uploads` ADD CONSTRAINT `uploads_submission_id_submissions_id_fk` FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON DELETE cascade ON UPDATE no action;