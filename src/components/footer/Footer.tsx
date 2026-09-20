import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Code2Icon, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react';
import { profileData } from '../../data/profile';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Navigate',
		links: [
			{ title: 'About', href: '#about' },
			{ title: 'Experience', href: '#experience' },
			{ title: 'Skills', href: '#skills' },
			{ title: 'Projects', href: '#projects' },
		],
	},
	{
		label: 'More',
		links: [
			{ title: 'Education', href: '#education' },
			{ title: 'Certifications', href: '#certifications' },
			{ title: 'Achievements', href: '#achievements' },
			{ title: 'Contact', href: '#contact' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'GitHub', href: profileData.socials.github, icon: GithubIcon },
			{ title: 'LinkedIn', href: profileData.socials.linkedin, icon: LinkedinIcon },
			{ title: 'LeetCode', href: profileData.socials.leetcode, icon: Code2Icon },
			{ title: 'Email', href: profileData.socials.email, icon: MailIcon },
		],
	},
];

export function Footer() {
	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (href.startsWith('#')) {
			e.preventDefault();
			const el = document.getElementById(href.slice(1));
			if (el) {
				const top = el.getBoundingClientRect().top + window.scrollY - 70;
				window.scrollTo({ top, behavior: 'smooth' });
			}
		}
	};

	return (
		<footer
			id="portfolio-footer"
			className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-slate-200 bg-slate-50 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(15,23,42,0.05),transparent)] px-6 py-12 lg:py-16 dark:border-slate-800 dark:bg-[#080c16] dark:bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.08),transparent)]"
		>
			<div className="bg-slate-900/20 dark:bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<p className="text-slate-600 dark:text-neutral-400 text-sm">
						© {new Date().getFullYear()} {profileData.displayName}. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid w-full grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-500">
									{section.label}
								</h3>
								<ul className="text-slate-600 dark:text-neutral-400 mt-4 space-y-2 text-sm">
									{section.links.map((link) => {
										const isExternal = link.href.startsWith('http');
										return (
											<li key={link.title}>
												<a
													href={link.href}
													onClick={(e) => handleLinkClick(e, link.href)}
													target={isExternal ? '_blank' : undefined}
													rel={isExternal ? 'noopener noreferrer' : undefined}
													className="hover:text-slate-900 dark:hover:text-white inline-flex items-center transition-all duration-300"
												>
													{link.icon && <link.icon className="me-1 size-4" />}
													{link.title}
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

const AnimatedContainer: React.FC<ViewAnimationProps> = ({ className, delay = 0.1, children }) => {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
